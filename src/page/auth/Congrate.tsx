import { Link, useLocation } from "react-router-dom";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FC } from "react";

interface iTitle {
  title?: string;
}

const Congrate: FC<iTitle> = ({ title }) => {
  const read = useLocation().pathname;

  console.log(read);
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
      <div className="w-[90%] lg:w-[100%] px-4 mx-2">
        <div>{title}</div>{" "}
        <div>
          {read === "/account/account-verified" ? (
            <Link to="/login">
              <button
                type="submit"
                className="rounded-sm bg-purple-500 w-full text-white mt-4 py-4 hover:cursor-pointer hover:translate-y-1 transition-all duration-300 hover:shadow-md  "
              >
                continue
              </button>
            </Link>
          ) : (
            <Link to="/account/verify">
              <button
                type="submit"
                className="rounded-sm bg-purple-500 w-full text-white mt-4 py-4 hover:cursor-pointer hover:translate-y-1 transition-all duration-300 hover:shadow-md  "
              >
                Verify my Account
              </button>
            </Link>
          )}
        </div>
      </div>
    </form>
  );
};

export default Congrate;
