export interface ILoginInput {
  placeholder: string;
  label: string;
  type: string;
  icon: string;
  name: "email" | "password";
}

export interface IRegisterInput {
  placeholder: string;
  label: string;
  type: string;
  icon: string;
  name: "email" | "username" | "password";
}

export interface IProfileInput {
  placeholder: string;
  label: string;
  type: string;
  icon?: string;
  name: "firstName" | "lastName" | "email";
}

export interface IErrorResponse {
  error: {
    details?: {
      errors: {
        message: string;
      }[];
    };
    message?: string;
  };
}