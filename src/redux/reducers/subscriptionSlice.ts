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
};

const subscriptionSlice = createSlice({
  name: 'subscription',
  initialState: initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addMatcher(paymentsApi.endpoints.getSubscription.matchFulfilled, (state, action) => {
        return { ...state, ...action.payload };
      })
      .addMatcher(paymentsApi.endpoints.cancelSubscription.matchFulfilled, () => {
        return { ...initialState };
      });
  },
});

export default subscriptionSlice.reducer;
export const selectSubscription = (state: RootState) => state.subscription;
