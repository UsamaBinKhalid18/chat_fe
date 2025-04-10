import { createSlice } from '@reduxjs/toolkit';
import { paymentsApi, Subscription } from 'src/apis/paymentsApi';

import { RootState } from '../store';

const initialState: Subscription = {
  id: 0,
  current_period_end: '',
  is_active: false,
  package: {
    id: 0,
    name: '',
  },
  free_requests: 0,
};

const subscriptionSlice = createSlice({
  name: 'subscription',
  initialState: initialState,
  reducers: {
    setFreeRequests: (state, action) => {
      state.free_requests = action.payload;
    },
    reduceFreeRequests: (state, action) => {
      if (!state.is_active) {
        state.free_requests -= action.payload;
      }
    },
  },
  extraReducers(builder) {
    builder
      .addMatcher(paymentsApi.endpoints.getSubscription.matchFulfilled, (state, action) => {
        return { ...state, ...action.payload, free_requests: state.free_requests };
      })
      .addMatcher(paymentsApi.endpoints.cancelSubscription.matchFulfilled, (state) => {
        return { ...initialState, free_requests: state.free_requests };
      })
      .addMatcher(paymentsApi.endpoints.getFreeRequests.matchFulfilled, (state, action) => {
        return { ...state, free_requests: action.payload.remaining_requests };
      });
  },
});

export default subscriptionSlice.reducer;
export const { setFreeRequests, reduceFreeRequests } = subscriptionSlice.actions;
export const selectSubscription = (state: RootState) => state.subscription;
