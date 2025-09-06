import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { User } from "../types/User";

type AuthState = {
  isGuest: boolean;
  user: User | null;
};

const initialState: AuthState = {
  isGuest: false,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setGuest(state) {
      state.isGuest = true;
      state.user = null;
    },
    setLogin(state, action: PayloadAction<User>) {
      state.isGuest = false;
      state.user = action.payload;
    },
    setLogout() {
      return initialState;
    },
  },
});

export const { setGuest, setLogin, setLogout } = authSlice.actions;
export default authSlice.reducer;
