import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { isAuthenticated } from "../cookies";


export default async function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isAuth = await isAuthenticated();

  if (isAuth) {
    setTimeout(() => {
      redirect("/");
    }, 1000);
  }

  return (
    <main className="bg-[#fafafa] flex items-center flex-col gap-10 w-full min-h-screen">
      <Link href={"/"}>
        <Image src="/images/logo-devlinks-large.svg" width={185} height={50} alt="Dev Links Logo" className="mt-12" />
      </Link>
      {children}
    </main>
  );
}