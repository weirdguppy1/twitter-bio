import React, { useEffect } from "react";
import useAuthFuncs from "../hooks/useAuthFuncs";
import Navbar from "../components/Navbar";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";

export default function Signup() {
  const { signUpTwitter } = useAuthFuncs();

  const { register, handleSubmit, setValue } = useForm<{ username: string }>();
  const { username } = useParams<{ username: string | undefined }>();

  const onSubmit = handleSubmit(async data => {
    signUpTwitter(data.username);
  });

  useEffect(() => {
    setValue("username", username || "");
  }, []);

  return (
    <>
      <Navbar />
      <main
        id="auth"
        className="flex h-screen flex-col items-center  bg-tblue font-satoshi text-white"
      >
        <div className="mt-12 flex flex-col items-center space-y-2">
          {/* <span className="inline-flex rounded-full border-2 border-gray-300 bg-white px-4 py-1 text-sm text-tblack underline">
            <ExclamationTriangleIcon className="mr-3 h-5 w-5 fill-yellow-500" />{" "}
            in beta
          </span> */}
          <h1 className="text-6xl font-bold">Sign up</h1>
        </div>
        <div className="flex max-w-xl flex-col items-center ">
          <form onSubmit={onSubmit} className="mt-5">
            <div className="flex space-x-2 text-sm text-white sm:text-base md:text-lg lg:text-xl">
              <div className="rounded-lg bg-gradient-to-r from-pink-500 to-transparent sm:p-1">
                <div className="flex h-full w-full items-center justify-center bg-tblue">
                  <div className="flex space-x-2 rounded-xl bg-inherit px-6 py-3">
                    <h1>coolbio.com/</h1>
                    <input
                      autoComplete="off"
                      type="text"
                      {...register("username", {
                        required: true,
                        pattern: /^[a-zA-Z0-9_]*$/
                      })}
                      placeholder="yourusername"
                      className="bg-inherit text-white placeholder-white placeholder-opacity-50 focus:outline-none"
                    />
                  </div>{" "}
                </div>
              </div>
            </div>
            <button
              type="submit"
              onClick={onSubmit}
              className=" duration-250 mt-2 w-full rounded-full border-2 border-gray-200 px-3 py-1 text-xl shadow-lg transition hover:opacity-75 hover:shadow-xl md:mt-4 md:py-2"
            >
              <div className="flex items-center justify-center space-x-2">
                <h1 className="font-bold">Sign up with </h1>
                <svg
                  fill="currentColor"
                  className="h-8 w-8"
                  viewBox="0 0 16 16"
                >
                  <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z" />
                </svg>
              </div>
            </button>
          </form>
        </div>
      </main>
    </>
  );
}
