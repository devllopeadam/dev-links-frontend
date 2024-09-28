import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Preview | Dev Links",
  description: "Dev Links preview page",
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