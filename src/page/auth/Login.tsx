import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signInAccount } from "../../api/authAPI";
import { useDispatch } from "react-redux";
import { user } from "../../global/reduxState";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const schema = yup.object({
    schoolName: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().required(),
    confirm: yup.string().oneOf([yup.ref("password")]),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onHandleSubmit = handleSubmit(async (data: {}) => {
    signInAccount(data).then((res) => {
      dispatch(user(res.data));

      navigate("/");
    });
  });

  return (
    <form
      onSubmit={onHandleSubmit}
      className="w-[100%]  h-[100vh] justify-center items-center flex "
    >
      <div className="w-[90%] lg:w-[100%] px-4 mx-2">
        <div>
          <div className="border flex flex-col w-full rounded-md relative h-[50px] justify-center my-2  mt-8">
            <label className="text-[14px] absolute left-2 -top-3 bg-white px-2 leading-tight ">
              school name
            </label>
            <input
              {...register("schoolName")}
              placeholder="school name"
              className="pl-2 flex-1 h-[100%] bg-transparent outline-none "
            />
          </div>
          {errors.schoolName && (
            <div className="leading-tight -mt-1 text-right mr-1 text-[12px] text-red-500 ">
              {errors.schoolName.message}
            </div>
          )}
        </div>{" "}
        <div>
          <div className="border flex flex-col w-full rounded-md relative h-[50px] justify-center my-2  mt-8">
            <label className="text-[14px] absolute left-2 -top-3 bg-white px-2 leading-tight ">
              email
            </label>
            <input
              {...register("email")}
              placeholder="email"
              className="pl-2 flex-1 h-[100%] bg-transparent outline-none "
            />
          </div>
          {errors.email && (
            <div className="leading-tight -mt-1 text-right mr-1 text-[12px] text-red-500 ">
              {errors.email.message}
            </div>
          )}
        </div>
        <div>
          <div className="border flex flex-col w-full rounded-md relative h-[50px] justify-center my-2 mt-8">
            <label className="text-[14px] absolute left-2 -top-3 bg-white px-2 leading-tight ">
              password
            </label>
            <input
              {...register("password")}
              placeholder="password"
              className="pl-2 flex-1 h-[100%] bg-transparent outline-none "
            />
          </div>
          {errors.password && (
            <div className="leading-tight -mt-1 text-right mr-1 text-[12px] text-red-500 ">
              {errors.password.message}
            </div>
          )}
        </div>
        <div>
          <button
            type="submit"
            className="rounded-sm bg-purple-500 w-full text-white mt-4 py-4 hover:cursor-pointer hover:translate-y-1 transition-all duration-300 hover:shadow-md  "
          >
            Login
          </button>
        </div>
        <div className=" flex justify-center mt-10 text-[12px]">
          <div>
            Don't have an Account,{" "}
            <Link to="/account/register" className="font-bold text-purple-950">
              Register here
            </Link>
          </div>
        </div>
        <div className="mt-8 flex w-full items-center justify-center">
          <div className="border-b flex-1" />
          <span className="mx-2">or</span>
          <div className="border-b flex-1" />
        </div>
        <div className="mt-8 flex w-full justify-center items-center ">
          <div className="flex px-4 py-2 border cursor-pointer">
            <div>icon</div>
            <div>Google</div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Login;
