import { create } from "zustand";
import { persist } from "zustand/middleware";

const useAuthStore = create((set, get) => ({
  user: {
    isLoggedIn: false,
    token: null,
    username: null,
  },
  loginUser: (isLoggedIn, token, username) => {
    set({
      user: {
        isLoggedIn: isLoggedIn,
        token: token,
        username: username,
      },
    });
  },
  logoutUser: () => {
    set(
      (state) =>
        (state.user = { isLoggedIn: false, token: null, username: null })
    );
    console.log("current store value : ", get().user);
  },
}));

export default useAuthStore;
