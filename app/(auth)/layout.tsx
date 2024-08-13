import { getServerSession } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import { options } from "../api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";


export default async function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(options);
  if (session) {
    return redirect("/links");
  }
  return (
    <main className="bg-[#fafafa] flex items-center flex-col gap-8 w-full min-h-screen">
      <Link href={"/links"}>
        <Image src="/images/logo-devlinks-large.svg" width={185} height={50} alt="Dev Links Logo" className="mt-10"/>
      </Link>
      {children}
    </main>
  );
}