import { ComponentProps, forwardRef, useState } from "react";
import { CrossCircledIcon } from "@radix-ui/react-icons";
import { cn } from "../../utils/cn";
import { Eye, EyeSlash } from "phosphor-react";

interface InputProps extends ComponentProps<"input"> {
  name: string;
  error?: string;
}

export const PasswordInput = forwardRef<HTMLInputElement, InputProps>(
  ({ id, name, placeholder, error, ...props }, ref) => {

    const [isPasswordOpen, setIsPasswordOpen] = useState(false);

    return (
      <div className="relative">
        <div className="flex items-center w-full">
        <input
          {...props}
          ref={ref}
          name={name}
          type={!isPasswordOpen ? 'password' : 'string'}
          id={id ?? name}
          className={cn('rounded-lg border border-gray-light pt-4 px-3 h-12 bg-white-main w-full peer placeholder-shown:pt-0 focus:border-gray-dark outline-none transition-all', error && '!border-red-main')}
          placeholder=" "
        />
        {isPasswordOpen ? <EyeSlash size={25} className="absolute right-4 cursor-pointer" onClick={() => setIsPasswordOpen(!isPasswordOpen)}/> : <Eye size={25} className="absolute right-4 cursor-pointer" onClick={() => setIsPasswordOpen(!isPasswordOpen)}/> }
         
        <label
          htmlFor={id ?? name}
          className="absolute text-xs top-2 left-[13px]  pointer-events-none peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-input peer-placeholder-shown:top-3.5 transition-all font-mono font-normal"
        >
          {placeholder}
        </label>
        </div>
        {error && (
          <div className="flex gap-1 items-center mt-2 text-red-main">
            <CrossCircledIcon />
            <span className="text-xs">{error}</span>
          </div>
        )}
      </div>
    );
  }
);

PasswordInput.displayName = "PasswordInput";
