


export function OpenModalLink (props: any) {
  return (
    <button className="bg-white-main hover:text-white-main hover:bg-green-main disabled:bg-gray-main px-6 text-green-main h-8 rounded-lg font-medium border-green-main border-2 disabled:text-gray-dark disabled:cursor-not-allowed transition-all md:min-w-[200px] min-w-[140px] ">
      {props.children}
    </button>
  )
}
