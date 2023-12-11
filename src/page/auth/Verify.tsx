import { Link } from "react-router-dom";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import VerifyCode from "./VerifyCode";

const Verify = () => {
  const schema = yup.object({
    code: yup.string().required(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onHandleSubmit = handleSubmit(async (data: {}) => {
    console.log(data);
  });

  return (
    <form
      onSubmit={onHandleSubmit}
      className="w-[100%]  h-[100vh] justify-center items-center flex "
    >
      <div className="w-[90%] lg:w-[100%] px-4 mx-2 flex items-center flex-col">
        <VerifyCode />
        <div className="w-full">
          <button
            type="submit"
            className="rounded-sm bg-purple-500 w-full text-white mt-4 py-4 hover:cursor-pointer hover:translate-y-1 transition-all duration-300 hover:shadow-md  "
          >
            Verify Account
          </button>
        </div>
      </div>
    </form>
  );
};

export default Verify;
