import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ChatState {
  showChat: boolean;
  message: string;
}

export const initialState: ChatState = {
  showChat: true,
  message: "hello",
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setShowChat: (state, action: PayloadAction<boolean>) => {
      state.showChat = action.payload;
    },

    setMessage: (state, action: PayloadAction<string>) => {
      state.message = action.payload;
    },
  },
});

export const { setShowChat, setMessage } = chatSlice.actions;
export default chatSlice.reducer;
