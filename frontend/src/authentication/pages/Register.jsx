import { zodResolver } from "@hookform/resolvers/zod";
import React, { useRef } from "react";
import { useForm } from "react-hook-form";
import { userRegistrationSchema } from "../models/user";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { toast } from "react-toastify";
import axios from "axios";

/**
 *
 * this component is used to Register
 * a non existing user
 *
 * it will check if a user has already been added
 * otherwise it the unregistered user will be added
 * to the database
 *
 * @returns the register template
 */
function Register() {
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
    reset,
  } = useForm({
    resolver: zodResolver(userRegistrationSchema),
  });

  const toastId = useRef(null);

  const navigate = useNavigate();

  const handleSuccess = (response) => {
    /**
     * Notifies the user for any messages
     * coming from the backend
     */
    toastId.current = toast.info(response);
    reset();
  };

  const handleError = (error) => {
    /**
     * Notifies the user for any messages
     * coming from the backend
     */

    toastId.current = toast.error(error);
  };

  /**
   * function usde to handle Login button
   * to navigate to the login page
   */
  const handleLogin = () => {
    navigate("/login");
  };

  const onSubmit = async (formData) => {
    /**
     * sends a request to the backend
     * to create a new user
     */

    await axios
      .post("http://localhost:3000/register", formData)
      .then((response) => {
        handleSuccess(response.data.message);
      })
      .catch((error) => {
        handleError(error.response.data.message);
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2} direction="column" sx={{ width: { sm: 400 } }}>
          <Typography variant="h6" gutterBottom>
            Register Page
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
            {isSubmitting ? "Loading" : "Register"}
          </Button>
          <Button disabled={isSubmitting} onClick={handleLogin}>
            Sign in Here
          </Button>
        </Stack>
      </form>
    </div>
  );
}

export default Register;
