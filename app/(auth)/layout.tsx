import Image from "next/image";
import Link from "next/link";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="bg-[#fafafa] flex items-center flex-col gap-8 w-full min-h-screen">
      <Link href={"/"}>
        <Image src="/images/logo-devlinks-large.svg" width={185} height={50} alt="Dev Links Logo" className="mt-10"/>
      </Link>
      {children}
    </main>
  );
}