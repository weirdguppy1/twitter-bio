import React, { Children, useEffect } from "react";
import {
  HandThumbUpIcon,
  HeartIcon,
  PaintBrushIcon
} from "@heroicons/react/24/solid";
import useAuthFuncs from "../hooks/useAuthFuncs";
import DashNav from "../components/Dashboard/DashNav";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";
import BioCreator from "../components/Dashboard/BioCreator";
import useFirestore from "../hooks/useFirestore";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [user] = useAuthState(auth);
  const { userExists } = useFirestore();

  return (
    <>
      <DashNav />
      <main
        id="auth"
        className="flex min-h-screen flex-col items-center  bg-tblue py-12 font-satoshi text-white"
      >
        <h1 className="text-4xl">
          Hello,{" "}
          <span className="font-bold">{user?.displayName || "User"}</span>
        </h1>
        <div className="flex w-full justify-center">
          <BioCreator />
        </div>
      </main>
    </>
  );
}
