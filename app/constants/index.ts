import {
  ILoginInput,
  IPlatform,
  IProfileInput,
  IRegisterInput,
  IUserData,
  Platform,
} from "../interfaces";

import GithubIconGray from "@/public/images/icon-github-gray.svg";
import FrontEndMentorIconGray from "@/public/images/icon-frontend-mentor-gray.svg";
import XIconGray from "@/public/images/icon-x-gray.svg";
import LinkedInIconGray from "@/public/images/icon-linkedin-gray.svg";
import YoutubeIconGray from "@/public/images/icon-youtube-gray.svg";
import FacebookIconGray from "@/public/images/icon-facebook-gray.svg";
import TwitchIconGray from "@/public/images/icon-twitch-gray.svg";
import CodewarsIconGray from "@/public/images/icon-codewars-gray.svg";
import FreeCodeCampIconGray from "@/public/images/icon-freecodecamp-gray.svg";
import GitLabIconGray from "@/public/images/icon-gitlab-gray.svg";
import HashnodeIconGray from "@/public/images/icon-hashnode-gray.svg";
import DevToIconGray from "@/public/images/icon-devto-gray.svg";
import StackOverflowIconGray from "@/public/images/icon-stack-overflow-gray.svg";
import MediumIconGray from "@/public/images/icon-medium-gray.svg";
import LeetCodeIconGray from "@/public/images/icon-leetcode-gray.svg";
import HackerrankIconGray from "@/public/images/icon-hackerrank-gray.svg";
import CodepenIconGray from "@/public/images/icon-codepen-gray.svg";

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
    icon: "/images/icon-user.svg",
  },
  {
    placeholder: "Email",
    type: "text",
    name: "email",
    label: "Email Adress",
    icon: "/images/icon-email.svg",
  },
  {
    placeholder: "At least 6 characters",
    type: "password",
    name: "password",
    label: "Password",
    icon: "/images/icon-password.svg",
  },
];

export const PROFILE_FORM: IProfileInput[] = [
  {
    placeholder: "eg. John",
    type: "text",
    name: "firstName",
    label: "First name",
  },
  {
    placeholder: "eg. Doe",
    type: "text",
    name: "lastName",
    label: "Last name",
  },
  {
    placeholder: "eg. example@gmail.com",
    type: "email",
    name: "email",
    label: "Email",
    icon: "/images/icon-password.svg",
  },
];

export const grayIcons: Record<Platform, () => JSX.Element> = {
  Github: GithubIconGray,
  "Frontend Mentor": FrontEndMentorIconGray,
  X: XIconGray,
  LinkedIn: LinkedInIconGray,
  Youtube: YoutubeIconGray,
  Facebook: FacebookIconGray,
  Twitch: TwitchIconGray,
  Codewars: CodewarsIconGray,
  FreeCodeCamp: FreeCodeCampIconGray,
  GitLab: GitLabIconGray,
  Hashnode: HashnodeIconGray,
  "Dev.To": DevToIconGray,
  "Stack Overflow": StackOverflowIconGray,
  Medium: MediumIconGray,
  LeetCode: LeetCodeIconGray,
  HackerRank: HackerrankIconGray,
  Codepen: CodepenIconGray,
};

export const platforms: IPlatform[] = [
  { icon: GithubIconGray, name: "Github", defaultValue: "https://github.com/" },
  {
    icon: FrontEndMentorIconGray,
    name: "Frontend Mentor",
    defaultValue: "https://frontendmentor.io/profile/",
  },
  {
    icon: XIconGray,
    name: "X",
    defaultValue: "https://x.com/",
  },
  {
    icon: LinkedInIconGray,
    name: "LinkedIn",
    defaultValue: "https://linkedin.com/in/",
  },
  {
    icon: YoutubeIconGray,
    name: "Youtube",
    defaultValue: "https://youtube.com/@",
  },
  {
    icon: FacebookIconGray,
    name: "Facebook",
    defaultValue: "https://facebook.com/",
  },
  {
    icon: TwitchIconGray,
    name: "Twitch",
    defaultValue: "https://twitch.tv/",
  },
  {
    icon: CodewarsIconGray,
    name: "Codewars",
    defaultValue: "https://codewars.com/users/",
  },
  {
    icon: FreeCodeCampIconGray,
    name: "FreeCodeCamp",
    defaultValue: "https://freecodecamp.org/",
  },
  {
    icon: GitLabIconGray,
    name: "GitLab",
    defaultValue: "https://gitlab.com/",
  },
  {
    icon: HashnodeIconGray,
    name: "Hashnode",
    defaultValue: "https://hashnode.com/@",
  },
  {
    icon: DevToIconGray,
    name: "Dev.To",
    defaultValue: "https://dev.to/",
  },
  {
    icon: StackOverflowIconGray,
    name: "Stack Overflow",
    defaultValue: "https://stackoverflow.com/users/",
  },
  {
    icon: MediumIconGray,
    name: "Medium",
    defaultValue: "https://medium.com/@",
  },
  {
    icon: LeetCodeIconGray,
    name: "LeetCode",
    defaultValue: "https://leetcode.com/",
  },
  {
    icon: HackerrankIconGray,
    name: "HackerRank",
    defaultValue: "https://hackerrank.com/profile/",
  },
  {
    icon: CodepenIconGray,
    name: "Codepen",
    defaultValue: "https://codepen.io/",
  },
];

export const platform_bases: Record<Platform, string> = {
  Github: "https://github.com/",
  "Frontend Mentor": "https://frontendmentor.io/profile/",
  X: "https://X.com/",
  LinkedIn: "https://linkedin.com/in/",
  Youtube: "https://youtube.com/@",
  Facebook: "https://facebook.com/",
  Twitch: "https://twitch.tv/",
  Codewars: "https://codewars.com/users/",
  FreeCodeCamp: "https://freecodecamp.org/",
  GitLab: "https://gitlab.com/",
  Hashnode: "https://hashnode.com/@",
  "Dev.To": "https://dev.to/",
  "Stack Overflow": "https://stackoverflow.com/users/",
  Medium: "https://medium.com/@",
  LeetCode: "https://leetcode.com/",
  HackerRank: "https://hackerrank.com/profile/",
  Codepen: "https://codepen.io/",
};

export const platforms_colors: Record<Platform, string> = {
  Github: "#333333",
  "Frontend Mentor": "#FAFAFA",
  X: "#1DA1F2",
  LinkedIn: "#0077B5",
  Youtube: "#FF0000",
  Facebook: "#1877F2",
  Twitch: "#9146FF",
  Codewars: "#B1361E",
  FreeCodeCamp: "#006400",
  GitLab: "#FC6D26",
  Hashnode: "#2962FF",
  "Dev.To": "#0A0A0A",
  "Stack Overflow": "#F48024",
  Medium: "#12100E",
  LeetCode: "#2e2e2e",
  HackerRank: "#39424E",
  Codepen: "#7fcca6",
};

export function getIconForPlatform(platform: Platform) {
  const icons = {
    Github: "/images/icon-github.svg",
    "Frontend Mentor": "/images/icon-frontend-mentor.svg",
    X: "/images/icon-x.svg",
    LinkedIn: "/images/icon-linkedin.svg",
    Youtube: "/images/icon-youtube.svg",
    Facebook: "/images/icon-facebook.svg",
    Twitch: "/images/icon-twitch.svg",
    "Dev.To": "/images/icon-devto.svg",
    Codewars: "/images/icon-codewars.svg",
    FreeCodeCamp: "/images/icon-freecodecamp.svg",
    GitLab: "/images/icon-gitlab.svg",
    Hashnode: "/images/icon-hashnode.svg",
    "Stack Overflow": "/images/icon-stack-overflow.svg",
    Medium: "/images/icon-medium.svg",
    LeetCode: "/images/icon-leetcode.svg",
    HackerRank: "/images/icon-hackerrank.svg",
    Codepen: "/images/icon-codepen.svg",
  };

  return icons[platform];
}
export function getGrayIconForPlatform(platform: Platform) {
  const icons = {
    Github: "/images/icon-github-gray.svg",
    "Frontend Mentor": "/images/icon-frontend-mentor-gray.svg",
    X: "/images/icon-X-gray.svg",
    LinkedIn: "/images/icon-linkedin-gray.svg",
    Youtube: "/images/icon-youtube-gray.svg",
    Facebook: "/images/icon-facebook-gray.svg",
    Twitch: "/images/icon-twitch-gray.svg",
    "Dev.To": "/images/icon-devto-gray.svg",
    Codewars: "/images/icon-codewars-gray.svg",
    FreeCodeCamp: "/images/icon-freecodecamp-gray.svg",
    GitLab: "/images/icon-gitlab-gray.svg",
    Hashnode: "/images/icon-hashnode-gray.svg",
    "Stack Overflow": "/images/icon-stack-overflow-gray.svg",
    Medium: "/images/icon-medium-gray.svg",
    LeetCode: "/images/icon-leetcode-gray.svg",
    HackerRank: "/images/icon-hackerrank-gray.svg",
    Codepen: "/images/icon-codepen-gray.svg",
  };

  return icons[platform];
}

export function getLastOrder(userData: IUserData) {
  const { links } = userData;
  return links.length ? Math.max(...links.map((link) => link.order)) : 0;
}