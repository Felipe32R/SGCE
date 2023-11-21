import { ComponentProps } from "react";

interface ButtonProps extends ComponentProps<'button'>{}

export function ButtonOutlined (props: ButtonProps) {
  return (
    <button {...props} className="bg-white-main hover:text-white-main hover:bg-blue-dark disabled:bg-gray-main px-6 text-blue-dark h-12 rounded-lg font-medium border-blue-dark border-2 disabled:text-gray-dark disabled:cursor-not-allowed transition-all md:min-w-[200px] min-w-[140px] "  />
  )
}
