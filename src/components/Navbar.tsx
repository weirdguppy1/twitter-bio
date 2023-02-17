import React from "react";
import { Link } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";

const Navbar = () => {
  return (
    <nav className="flex justify-center bg-tblue p-4 text-white md:justify-end">
      <div className="flex items-center space-x-2">
        <h1 className="underline:underline duration-250 text-xl transition hover:text-gray-100 hover:text-opacity-50">
          <Link to="/">Home</Link>
        </h1>
        <h1 className="underline:underline duration-250 text-xl transition hover:text-gray-100 hover:text-opacity-50">
          <Link className="btn-short btn-black" to="/a/signup">
            Sign up
          </Link>
        </h1>
        <h1 className=" underline:underline duration-250 text-xl transition hover:text-gray-100 hover:text-opacity-50">
          <Link className="btn-short btn-black" to="/a/login">
            Log in
          </Link>
        </h1>
      </div>
    </nav>
  );
};

export default Navbar;
