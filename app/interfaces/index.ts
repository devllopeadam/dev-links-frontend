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

export interface IPlatform {
  icon: string;
  name: Platform;
  defaultValue: string;
}

export type Link = {
  id: number;
  platform: Platform;
  link: string;
  order: number;
};

export type User = {
  id?: string | null;
  image?: string | null;
  firstName?: string;
  lastName?: string;
  email?: string | null;
};

export interface IUserData {
  user: User;
  links: Link[];
}

export type Platform =
  | "Github"
  | "Frontend Mentor"
  | "X"
  | "LinkedIn"
  | "Youtube"
  | "Facebook"
  | "Twitch"
  | "Codewars"
  | "FreeCodeCamp"
  | "LeetCode"
  | "GitLab"
  | "Hashnode"
  | "HackerRank"
  | "Dev.To"
  | "Stack Overflow"
  | "Medium"
  | "Codepen";
