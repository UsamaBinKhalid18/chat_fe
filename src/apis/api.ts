import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react';
import { Mutex } from 'async-mutex';
import { endpoints } from 'src/apis/endpoints.ts';
import { errorCodes, TOKEN_KEYS } from 'src/common/constants';
import { API_BASE_URL } from 'src/config';
import { RootState } from 'src/redux/store.ts';

const baseQuery = fetchBaseQuery({
  baseUrl: API_BASE_URL,
  prepareHeaders: (headers, { getState }) => {
    const access_token = (getState() as RootState).auth.access;
    if (access_token) {
      headers.set('Authorization', `Bearer ${access_token}`);
    }
    return headers;
  },
});
const authMutex = new Mutex();

const baseQueryWithRefresh: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions,
) => {
  await authMutex.waitForUnlock();
  let response = await baseQuery(args, api, extraOptions);

  if (response.error && response.error.status === errorCodes.UNAUTHORIZED_CODE) {
    if (!authMutex.isLocked()) {
      const release = await authMutex.acquire();
      try {
        const refresh_token = (api.getState() as RootState).auth.refresh;
        if (refresh_token) {
          const userId = (api.getState() as RootState).auth.user!.id;
          const refreshResult = await baseQuery(
            {
              url: endpoints.REFRESH_TOKEN(userId),
              method: 'POST',
              body: { [TOKEN_KEYS.REFRESH]: refresh_token },
            },
            api,
            extraOptions,
          );

          if (refreshResult.data) {
            api.dispatch({ type: 'auth/updateAccessToken', payload: refreshResult.data });
            response = await baseQuery(args, api, extraOptions);
          } else {
            api.dispatch({ type: 'auth/logOut' });
          }
        } else {
          api.dispatch({ type: 'auth/logOut' });
        }
      } finally {
        release();
      }
    } else {
      await authMutex.waitForUnlock();
      response = await baseQuery(args, api, extraOptions);
    }
  }

  return response;
};

export const api = createApi({
  baseQuery: baseQueryWithRefresh,
  tagTypes: ['freeRequests'],
  endpoints: () => ({}),
});
