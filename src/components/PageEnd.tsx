import { ArrowDownIcon } from "@heroicons/react/24/solid";
import React from "react";
import { FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";
import Logo from "../assets/images/logo.png";

const PageEnd = () => {
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-sm md:text-base lg:text-xl">
        Tired of the your Twitter bio?
      </h1>
      <h1 className="text-sm md:text-base lg:text-xl">
        Tired of the bio character limit?
      </h1>
      <ArrowDownIcon className="my-5 h-8 w-8" />
      <Link to="/">
        <div className="flex items-center space-x-3 rounded-xl px-6 py-3 transition hover:bg-black/50 hover:text-white">
          <img src={Logo} className="h-12 w-12 rounded-full shadow-xl" />
          <h1 className="inline-flex items-center text-sm sm:text-lg md:text-xl">
            Upgrade your <FaTwitter className="mx-2 h-6 w-6" /> bio.
          </h1>
        </div>
      </Link>
    </div>
  );
};

export default PageEnd;
