import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { aiModels } from 'src/common/constants';

import { RootState } from '../store';

type ChatState = {
  model: string;
};
const initialState: ChatState = {
  model: aiModels[0].name,
};
const chatCompletionSlice = createSlice({
  name: 'chatCompletion',
  initialState: initialState,
  reducers: {
    setModel: (state, action: PayloadAction<string>) => {
      state.model = action.payload;
    },
  },
});

export const { setModel } = chatCompletionSlice.actions;

export default chatCompletionSlice.reducer;

export const selectModel = (state: RootState) => state.chatCompletion.model;
