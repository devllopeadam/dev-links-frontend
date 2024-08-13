import { ILoginInput, IRegisterInput } from "../interfaces";

export const LOGIN_FORM: ILoginInput[] = [
  {
    placeholder: "e.g. alex@email.com",
    type: "text",
    name: "email",
    label: "Email adress",
    icon: "/images/icon-email.svg",
  },
  {
    placeholder: "Enter your password",
    type: "password",
    name: "password",
    label: "Password",
    icon: "/images/icon-password.svg",
  },
];


export const REGISTER_FORM: IRegisterInput[] = [
  {
    placeholder: "Username",
    type: "text",
    name: "username",
    label: "Username",
    icon: "/images/user.svg"
  },
  {
    placeholder: "Email",
    type: "text",
    name: "email",
    label: "Email Adress",
    icon: "/images/icon-email.svg"
  },
  {
    placeholder: "At least 6 characters",
    type: "password",
    name: "password",
    label: "Password",
    icon: "/images/icon-password.svg"
  },
];