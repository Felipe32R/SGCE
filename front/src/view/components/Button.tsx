import { ComponentProps } from "react";
import { Spinner } from "./Spinner";

interface ButtonProps extends ComponentProps<'button'>{
  isLoading?: boolean;
}

export function Button({isLoading, disabled,children, ...props}: ButtonProps) {
  return (
    <button {...props} 
    disabled={disabled || isLoading}
    className="bg-blue-dark hover:bg-blue-hover disabled:bg-gray-light px-6 text-white-main h-12 rounded-lg font-medium disabled:text-gray-dark disabled:cursor-not-allowed transition-all flex justify-center items-center md:min-w-[200px] min-w-[140px] text-center">
      {isLoading ? <Spinner/> : children}
    </button>
  )
}
