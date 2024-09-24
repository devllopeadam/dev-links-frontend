import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Register | Dev Links",
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