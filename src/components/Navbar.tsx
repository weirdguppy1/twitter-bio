import React from "react";
import { Link } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";

const Navbar = () => {
  const [user, loading, error] = useAuthState(auth);
  return (
    <nav className="flex bg-tblue p-4 text-white">
      <div className="flex items-center space-x-4">
        <h1 className="underline:underline duration-250 text-xl transition hover:text-gray-100 hover:text-opacity-50">
          <Link to="/">Home</Link>
        </h1>
        <h1 className=" underline:underline duration-250 text-xl transition hover:text-gray-100 hover:text-opacity-50">
          <Link className="btn btn-short btn-cyan" to="/auth">
            Sign in
          </Link>
        </h1>
      </div>
    </nav>
  );
};

export default Navbar;
