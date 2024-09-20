import { useRef } from "react";

/**
 * this hook is used to translate server side errors
 * so that the client knows what happens
 * @returns a string
 */
const useHttpError = () => {
  /**
   * the state is initialized with useRef
   * so that error handling wont cause
   * a component to rerender
   */
  const errorMessage = useRef("");

  const readError = (error) => {
    if (error.response) {
      /**
       * if the server sends an error
       * it will be handle here
       */
      errorMessage.current = error.response.data.message;
    } else if (error.request) {
      /**
       * if the request was made to the server
       * but it didn't anwser (error.response is not truthy)
       * the error can be handled here
       */
      errorMessage.current = error.message;
    } else {
      /**
       * if, for some reason it goes here
       * the is something wrong with the app
       */
      errorMessage.current = "Oops! Something bad happened, try again later";
    }

    return errorMessage.current;
  };

  return { readError };
};

export default useHttpError;
