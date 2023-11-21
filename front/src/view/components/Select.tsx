import { ComponentProps, forwardRef } from "react";
import { CrossCircledIcon } from "@radix-ui/react-icons";
import { cn } from "../../utils/cn";

interface InputProps extends ComponentProps<"select"> {

  error?: string;
}

export const Select = forwardRef<HTMLSelectElement, InputProps>(
  ({ error, ...props }, ref) => {
    return (
      <div className="relative ">
        <select
          {...props}
          ref={ref}

          className={cn('md:max-w-full max-w-[276px] font-mono rounded-lg border border-gray-light  px-3 h-12 bg-white-main w-full peer placeholder-shown:pt-0 focus:border-gray-dark outline-none transition-all', error && '!border-red-main')}
          placeholder=" "
        />
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

Select.displayName = "Select";
