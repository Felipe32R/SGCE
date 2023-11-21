import { ComponentProps, forwardRef } from "react";
import { CrossCircledIcon } from "@radix-ui/react-icons";
import { cn } from "../../utils/cn";

interface InputProps extends ComponentProps<"input"> {
  name: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ id, name, placeholder, error, ...props }, ref) => {
    


    function CNPJMask(value: string) {
      const v = value.replace(/\D/g, "").padEnd(14, "_");
      return v
        .replace(/^(\w{2})(\w)/, "$1.$2")
        .replace(/^(\w{2})\.(\w{3})(\w)/, "$1.$2.$3")
        .replace(/\.(\w{3})(\w)/, ".$1/$2")
        .replace(/(\w{4})(\w)/, "$1-$2");
    }
    return (
      <div className="relative">
        <input
          {...props}
          ref={ref}
          name={name}
          onChange={(e) => CNPJMask(e.target.value)}
          id={id ?? name}
          className={cn(
            " rounded-lg border border-gray-light pt-4 px-3 h-12 bg-white-main w-full peer placeholder-shown:pt-0 focus:border-gray-dark outline-none transition-all disabled:bg-gray-lighter disabled:cursor-not-allowed",
            error && "!border-red-main"
          )}
          placeholder=" "
        />
        <label
          htmlFor={id ?? name}
          className="absolute text-xs top-2 left-[13px]  pointer-events-none peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-input peer-placeholder-shown:top-3.5 transition-all font-mono font-medium"
        >
          {placeholder}
        </label>
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

Input.displayName = "Input";
