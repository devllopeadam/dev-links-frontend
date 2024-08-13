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