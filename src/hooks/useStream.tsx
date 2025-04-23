import { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { endpoints } from 'src/apis/endpoints';
import { API_BASE_URL } from 'src/config';
import { Message } from 'src/pages/Chat';
import {
  logOut,
  selectAccessToken,
  selectCurrentUser,
  selectRefreshToken,
  updateAccessToken,
} from 'src/redux/reducers/authSlice';
import { selectModel } from 'src/redux/reducers/chatCompletionSlice';
import {
  addNotification,
  setLoginModal,
  setUpgradePlanModal,
} from 'src/redux/reducers/notificationSlice';
import { reduceFreeRequests, setFreeRequests } from 'src/redux/reducers/subscriptionSlice';

const useStream = (url: string) => {
  const [data, setData] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const isStreaming = useRef(false); // Track if streaming has started
  const abortController = useRef<AbortController | null>(null); // Reference to AbortController
  const model = useSelector(selectModel);
  const accessToken = useSelector(selectAccessToken);
  const refreshToken = useSelector(selectRefreshToken);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectCurrentUser);

  const startStreaming = async (
    messages: Message[],
    props?: { token?: string; modelName?: string },
  ) => {
    if (isStreaming.current) return; // Prevent double execution
    isStreaming.current = true;
    abortController.current = new AbortController(); // Create a new AbortController
    setData('');
    setIsLoading(true);

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${props?.token ? props?.token : accessToken}`,
        },
        body: JSON.stringify({ messages: messages, model: props?.modelName || model }),
        signal: abortController.current.signal, // Attach abort signal
      });

      if (response.status === 401 && refreshToken) {
        // Refresh access token if unauthorized
        const refreshResponse = await fetch(
          `${API_BASE_URL}/${endpoints.REFRESH_TOKEN(user?.id ?? 0)}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ refresh: refreshToken }),
          },
        );

        if (refreshResponse.status === 200) {
          const { access } = await refreshResponse.json();
          dispatch(updateAccessToken({ access, refresh: refreshToken }));
          setTimeout(() => startStreaming(messages, { token: access }), 0);
        } else {
          dispatch(logOut());
          dispatch(
            addNotification({
              message: 'Session expired. Please log in again.',
              type: 'error',
              id: Date.now(),
            }),
          );
          dispatch(setLoginModal(true));
          navigate('/');
          return;
        }
      }

      if (response.status === 403) {
        dispatch(setUpgradePlanModal(true));
        dispatch(setFreeRequests(0));
        return;
      }

      if (!response.body || response.status !== 200) {
        setData('Server Busy');
        return;
      }

      dispatch(reduceFreeRequests(1));

      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        if (value) setData((prev) => prev + decoder.decode(value));
      }
    } catch (error) {
      if ((error as DOMException).name === 'AbortError') {
        console.log('Streaming aborted.');
      } else {
        console.error('Streaming error:', error);
      }
    } finally {
      setIsLoading(false);
      isStreaming.current = false;
    }
  };

  const stopStreaming = () => {
    if (abortController.current) {
      abortController.current.abort(); // Abort the fetch request
      abortController.current = null; // Reset the controller
    }
    isStreaming.current = false;
    setIsLoading(false);
  };

  return { data, isLoading, startStreaming, stopStreaming };
};

export default useStream;
