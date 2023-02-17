import React from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/images/logo.png";

const PageEnd = () => {
  return (
    <div className="flex flex-col">
      <Link to="/">
        <div className="flex items-center space-x-3 rounded-xl px-4 py-2 transition hover:bg-black hover:text-white">
          <img src={Logo} className="h-12 w-12 rounded-full shadow-xl" />
          <h1 className="text-xl">Twitter Bio.</h1>
        </div>
      </Link>
      <h1>Tired of the boring Twitter bio?</h1>
    </div>
  );
};

export default PageEnd;
