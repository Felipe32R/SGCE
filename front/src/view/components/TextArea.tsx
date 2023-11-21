import { ComponentProps, forwardRef } from "react";
import { CrossCircledIcon } from "@radix-ui/react-icons";
import { cn } from "../../utils/cn";

interface TextAreaProps extends ComponentProps<"textarea"> {
  name: string;
  error?: string;
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ id, name, placeholder, error, ...props }, ref) => {
    return (
      <div className="relative">
        <textarea
          {...props}
          ref={ref}
          name={name}
          id={id ?? name}
          className={cn('rounded-lg border border-gray-light pt-4 px-3 h-16 bg-white-main w-full peer placeholder-shown:pt-0 focus:border-gray-dark focus:pt-6 outline-none transition-all overflow-y-scroll resize-none', error && '!border-red-main')}
          placeholder=" "
        />
        <label
          htmlFor={id ?? name}
          className="absolute text-xs top-[1px] py-0.5 w-[95%] left-[13px]   pointer-events-none peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-input peer-placeholder-shown:top-3.5 peer-placeholder-shown:p-0 transition-all bg-white-main "
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

TextArea.displayName = "TextArea";
