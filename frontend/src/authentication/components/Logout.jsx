import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../hooks/useAuthStore";
import Button from "@mui/material/Button";
import axios from "axios";
import { toast } from "react-toastify";

function Logout() {
  const navigate = useNavigate();
  const { user, logoutUser } = useAuthStore();
  const toastId = useRef(null);

  const handleSuccess = (response) => {
    /**
     * Notifies the user for any messages
     * coming from the backend
     */
    toastId.current = toast.info(response.message);
    logoutUser();
    navigate("/login");
  };

  const handleError = (error) => {
    /**
     * Notifies the user for any messages
     * coming from the backend
     */
    toastId.current = toast.error(error);
  };

  const handleOnclick = async (event) => {
    /**
     * sends a request to the backend
     * to validate delete user's credentials
     * from the cookie
     */

    await axios
      .post(
        "http://localhost:3000/logout",
        {},
        {
          headers: {
            Authorization: user.token,
          },
          withCredentials: true,
        }
      )
      .then((response) => {
        handleSuccess(response.data);
      })
      .catch((error) => {
        handleError(error.response.data.message);
      });
  };

  return (
    <>
      <Button onClick={handleOnclick}>Click here to Logout</Button>
    </>
  );
}

export default Logout;
