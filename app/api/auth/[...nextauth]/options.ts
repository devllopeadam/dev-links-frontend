import type { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import axiosInstance from "@/app/config/axios.config";

export const options: NextAuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {label: "Email", type: "email", placeholder: "e.g. alex@email.com"},
        password: {label: "Password", type: "password", placeholder: "Enter your password"}
      },
      async authorize(credentials) {
        try {
          const {data} = await axiosInstance.post("/auth/local/", {
            identifier: credentials?.email,
            password: credentials?.password
          });
          return { id: data.user.id, name: data.user.username, email: data.user.email };
        } catch (error) {
          return null;
        }
      }
    })
  ],
  pages: {
    signIn: "/login",
  }
}