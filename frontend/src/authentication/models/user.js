import { z } from "zod";

/**
 * we choose to separate these for scalability
 * since registration might have more data/field to
 * validate in the future
 */

/**
 * Validation Schema for the register form
 */
const userRegistrationSchema = z.object({
  username: z.string().min(1, { message: "Username is required" }),
  password: z
    .string()
    .min(8, { message: "Password must have eight caracters" })
    .regex(/^(?=.*[0-9])(?=.*[A-Z])(?=.*[\W_]).+$/, {
      message:
        "Password should contain at least : one capital letter, one number and one special character",
    }),
});

/**
 * Validation schema for the login form
 */
const userLoginSchema = z.object({
  username: z.string().min(1, { message: "username is required" }),
  password: z.string().min(1, { message: "a password is required" }),
});

export { userRegistrationSchema, userLoginSchema };
