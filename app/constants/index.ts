import { ILoginInput } from "../interfaces";

export const LOGIN_FORM: ILoginInput[] = [
  {
    placeholder: "e.g. alex@email.com",
    type: "text",
    name: "email",
    label: "Email adress",
    icon: "/images/icon-email.svg"
  },
  {
    placeholder: "Enter your password",
    type: "password",
    name: "password",
    label: "Password",
    icon: "/images/icon-password.svg"
  },
];
