
import illustration from "../../assets/illustration.jpg";
import logo from "../../assets/SGCEBlue.svg";

import { Outlet, useLocation } from "react-router-dom";

export function AuthLayout() {
  const location = useLocation();
  return (
    <div className="flex w-full h-full">
      <div className={`bg-blue-lighter w-full h-full lg:w-1/2  ${location.pathname === '/register' && '!w-full'}  flex items-center justify-center flex-col`}>
        <img src={logo} className="md:h-8 h-8" />

        <div className={`md:mt-6 w-full max-w-[570px] md:px-8 px-4 mt-3  ${location.pathname === '/register' && 'max-w-[800px]'}`}>
          <Outlet/>
        </div>
      </div>
      <div className={`bg-blue-500  w-1/2  h-full hidden lg:flex justify-center items-center p-8  ${location.pathname === '/register' && '!hidden'}`}>
        <img
          src={illustration}
          className={`w-full h-full max-w-[456] max-h-[450px]  ${location.pathname === '/register' && 'hidden'}`}
        />
      </div>
    </div>
  );
}
