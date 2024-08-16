import Image from "next/image";
import Link from "next/link";
import { isAuthenticated } from "../cookies";
import { redirect } from "next/navigation";


export default async function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isAuth = await isAuthenticated();

  if (isAuth) {
    setTimeout(() => {
      redirect("/links");
    }, 1000);
  }

  return (
    <main className="bg-[#fafafa] flex items-center flex-col gap-10 w-full min-h-screen">
      <Link href={"/links"}>
        <Image src="/images/logo-devlinks-large.svg" width={185} height={50} alt="Dev Links Logo" className="mt-12" />
      </Link>
      {children}
    </main>
  );
}