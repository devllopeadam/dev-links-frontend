"use server";

import { cookies } from "next/headers";

export const fillCookies = (jwt: string, userId: number) => {
  cookies().set({
    name: "jwt",
    value: jwt,
    httpOnly: true,
    secure: true,
    path: "/",
  });
  cookies().set({
    name: "userId",
    value: userId as unknown as string,
    httpOnly: true,
    secure: true,
    path: "/",
  });
};
export async function isAuthenticated() {
  return cookies().has("jwt");
}

export const logout = () => {
  cookies().delete("jwt");
  cookies().delete("userId");
};

export const getCookies = async () => {
  return cookies().getAll();
};
