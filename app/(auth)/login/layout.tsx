import type { Metadata } from 'next'
import { ReactNode } from 'react'

export const metadata: Metadata = {
  title: "Login | Dev Links",
  description: "Dev Links login",
}

export default function Page({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    [children]
  )
}