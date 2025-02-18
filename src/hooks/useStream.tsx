import { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { endpoints } from 'src/apis/endpoints';
import { Message } from 'src/pages/Chat';
import {
  selectAccessToken,
  selectCurrentUser,
  selectRefreshToken,
  updateAccessToken,
} from 'src/redux/reducers/authSlice';
import { selectModel } from 'src/redux/reducers/chatCompletionSlice';
import { addNotification, setLoginModal } from 'src/redux/reducers/notificationSlice';

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

  const startStreaming = async (messages: Message[]) => {
    if (isStreaming.current) return; // Prevent double execution
    isStreaming.current = true;
    abortController.current = new AbortController(); // Create a new AbortController

    setData('');
    setIsLoading(true);

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${accessToken}` },
        body: JSON.stringify({ messages: messages, model }),
        signal: abortController.current.signal, // Attach abort signal
      });

      if (response.status === 401 && refreshToken) {
        // Refresh access token if unauthorized
        const refreshResponse = await fetch(endpoints.REFRESH_TOKEN(user?.id ?? 0), {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ refresh: refreshToken }),
        });

        if (refreshResponse.status === 200) {
          const { access } = await refreshResponse.json();
          dispatch(updateAccessToken({ access, refresh: refreshToken }));
          return startStreaming(messages);
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
          navigate('/home');
          return;
        }
      }

      if (response.status === 403) {
        dispatch(
          addNotification({
            message:
              'You do not have permission to access this resource. Please make sure you have subscription',
            type: 'error',
            id: Date.now(),
          }),
        );
        return navigate('/pricing');
      }

      if (!response.body || response.status !== 200) {
        setData('Server Busy');
        return;
      }

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
function logOut(): any {
  throw new Error('Function not implemented.');
}
