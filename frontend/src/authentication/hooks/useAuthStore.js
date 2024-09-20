import { create } from "zustand";

/**
 * this hook is a zustand store
 * it allows to create a global state (in memory)
 * that any component can change or read
 * this is mainly used to prevent prop drilling
 * and pass the authentication data (username and token)
 * from a high order component to its children components
 */
const useAuthStore = create((set) => ({
  /**
   * the object that contains the state
   */
  user: {
    isLoggedIn: false,
    token: null,
    username: null,
  },

  /**
   * this function allows the state "user" to get new values
   * in case of a sign in
   *
   * @param {*} isLoggedIn a boolean coming from the backend saying the user is logged in
   * @param {*} token jwt token
   * @param {*} username the username
   */
  loginUser: (isLoggedIn, token, username) => {
    set({
      user: {
        isLoggedIn: isLoggedIn,
        token: token,
        username: username,
      },
    });
  },

  /**
   * this function will reset the state
   * in a case of a sign out
   */
  logoutUser: () => {
    set(
      (state) =>
        (state.user = { isLoggedIn: false, token: null, username: null })
    );
  },
}));

export default useAuthStore;
