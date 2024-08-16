import * as yup from "yup";

export const loginSchema = yup
  .object({
    email: yup
    .string()
    .required("Can't be empty")
    .email("Invalid email Format"),
    password: yup
      .string()
      .required("Can't be empty")
      .min(4, "At least 4 characters"),
  })
  .required();


  export const registerSchema = yup
  .object({
    username: yup
      .string()
      .required("Can't be empty")
      .min(4, "At least 4 characters"),
    email: yup
      .string()
      .required("Can't be empty")
      .email("Invalid email Format"),
    password: yup
      .string()
      .required("Can't be empty")
      .min(6, "At least 6 characters"),
  })
  .required()


export const profileSchema = yup
  .object({
    firstName: yup
      .string()
      .required("Can't be empty")
      .min(4, "At least 4 characters"),
    lastName: yup
      .string()
      .required("Can't be empty")
      .min(4, "At least 4 characters"),
    email: yup
      .string()
      .required("Can't be empty")
      .email("Invalid email Format"),
  })
  .required();