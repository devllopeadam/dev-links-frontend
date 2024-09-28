import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: "Profile Links | Dev Links",
  description: "Dev Links links page",
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