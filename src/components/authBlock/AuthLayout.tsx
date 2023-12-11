import { Outlet } from "react-router-dom";
import pix from "../../assets/original-30f717a4bdaa31c02d1dcae13d68c561.png";

const AuthLayout = () => {
  return (
    <div className="grid-cols-1 lg:grid-cols-5 w-full h-[100vh] grid ">
      <div className="col-span-2 ">
        <Outlet />
      </div>
      <div className="hidden lg:block bg-white col-span-3 m-4 mr-0 rounded-l-lg shadow-md h-[90%] ">
        <div className="w-full h-[100%] ">
          <img
            src={pix}
            className="w-full h-[100%] object-cover  rounded-l-lg "
          />
        </div>
        {/* <div className="w-full flex items-center flex-col ">
          <div className="mt-4 font-bold relative">
            <div className="w-[100px] h-1 rounded-sm bg-slate-300 absolute left-0 top-0" />

            <div className="w-[60px] h-1 rounded-sm bg-orange-300 absolute left-0 top-0 " />
          </div>
          <div className="px-4 text-center mt-3 font-bold text-[25px]">
            Lorem ipsum dolor sit amet
          </div>
          <div className=" text-center font-medium text-[12px] text-[gray] ">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod, iure.
          </div>
          <div className="font-bold mt-9  text-[25px]">Logo</div>
        </div> */}
      </div>
    </div>
  );
};

export default AuthLayout;
