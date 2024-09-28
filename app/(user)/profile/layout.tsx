import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Profile Details | Dev Links",
  description: "Dev Links profile details page",
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