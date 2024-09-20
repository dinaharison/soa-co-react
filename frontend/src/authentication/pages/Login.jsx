import React, { useRef } from "react";
import { useForm } from "react-hook-form";
import { userLoginSchema } from "../models/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import useAuthStore from "../hooks/useAuthStore";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useHttpError from "../hooks/useHttpError";
/**
 *
 * this component is used to log in to the application
 * If the user is already registered and all the credentials
 * are correct, the user will be redirected to his home page
 *
 * othewise, a notification will pop out to notify the user
 * that his credentials are incorrect
 *
 * @returns the login form template
 */
function Login() {
  /**
   * using react hook form library to handle
   * form submission
   * a zod schema is provided to useForm to
   * map a defined schema
   * it handles input errors
   */
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
  } = useForm({
    resolver: zodResolver(userLoginSchema),
  });

  const toastId = useRef(null);

  /**
   * initialize the navigate variable to use
   * the useNavigate hook
   */
  const navigate = useNavigate();

  const { loginUser } = useAuthStore();

  const { readError } = useHttpError();

  const handleSuccess = (response) => {
    /**
     * Notifies the user for any messages
     * coming from the backend
     */
    loginUser(response.isLoggedIn, response.token, response.username);
    navigate("/");
    toastId.current = toast.success(response.message);
  };

  const handleError = (error) => {
    /**
     * Notifies the user for any errors
     * coming from the backend
     */
    toastId.current = toast.error(readError(error));
  };

  /**
   * used to handle the button register
   * to redirect to the register page
   */
  const handleRegister = () => {
    navigate("/register");
  };

  const onSubmit = async (formData) => {
    /**
     * sends a request to the backend
     * to validate user's credentials
     */
    await axios
      .post("http://localhost:3000/login", formData, {
        withCredentials: true,
      })
      .then((response) => {
        handleSuccess(response.data);
      })
      .catch((error) => {
        handleError(error);
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2} direction="column" sx={{ width: { sm: 400 } }}>
          <Typography variant="h6" gutterBottom>
            Login Page
          </Typography>
          <TextField
            label="Username"
            {...register("username")}
            error={!!errors.username}
            helperText={errors.username?.message}
          />
          <TextField
            label="Password"
            type="password"
            {...register("password")}
            error={!!errors.password}
            helperText={errors.password?.message}
          />
          <Button variant="contained" disabled={isSubmitting} type="submit">
            {isSubmitting ? "Loading" : "Login"}
          </Button>
          <Button disabled={isSubmitting} onClick={handleRegister}>
            Register Here
          </Button>
        </Stack>
      </form>
    </div>
  );
}

export default Login;
