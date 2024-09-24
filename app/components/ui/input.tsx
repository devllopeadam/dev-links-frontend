
import { cn } from "@/app/lib/utils";
import * as React from "react";
import Image from "next/image";
import {motion} from "framer-motion";

export interface InputProps 
  extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
  icon?: string;
  error?: string;
  className?: string;
  }

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, icon, error, value, onChange, type, ...props }, ref) => {
    return (
      <div className={`relative w-full flex flex-col gap-2 ${className}`}>
        <label htmlFor={props.id} className={cn("text-gray-800 text-[12px]", {'text-red-500': error})}>{label}</label>
        <div className="flex items-center relative">
          {icon && <Image className="absolute left-[14px] fill-current text-accent-gray" src={icon} alt={icon} width={16} height={16} />}
          <input
            type={type}
            className={cn(
              "pl-11 pr-4 flex h-12 w-full rounded-lg border border-input focus-visible:border-transparent py-2 text-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-[15px]  placeholder:text-accent-gray/60 focus-visible:outline-none focus-visible:ring-[1.5px] focus-visible:ring-[#633cff] disabled:cursor-not-allowed disabled:opacity-50",
              className, {
              'pl-4': !icon,
            },
              className,  {
                'border-red-500 ring-red-500 focus-visible:ring-1 focus-visible:ring-red-500': error,
              },
            )}
            ref={ref}
            value={value} // controlled value from react-hook-form
            onChange={onChange} // onChange handler from react-hook-form
            {...props}
          />
          {error && <motion.span initial={{opacity: 0, scale: 0.8}} animate={{opacity: 1, scale: 1}} className="absolute text-[14px] text-red-500 font-medium right-3">{error}</motion.span>}
        </div>
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
