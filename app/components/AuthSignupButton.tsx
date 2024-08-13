import { Button } from "@/app/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { signIn } from "next-auth/react"

interface IArgs {
  provider: string,
  icon: string,
}


export default function AuthSignupButton({provider, icon}: IArgs) {
  return (
    <Button type="button" onClick={() => signIn(provider, { callbackUrl: "/links" })} variant={'destructive'} className="h-14 flex items-center gap-2">
      <Image src={icon} width={20} height={20} alt={`${provider} Icon`}/>
      <p className="text-[15px] text-dark-gray">Sign up with {provider[0].toUpperCase() + provider.slice(1)}</p>
    </Button>
  )
}