import React, { Children } from "react";
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

export default function Dashboard() {
  const { signOutUser } = useAuthFuncs();
  const [user, loading] = useAuthState(auth);

  return (
    <>
      <DashNav />
      <main
        id="auth"
        className="flex h-screen flex-col items-center  bg-tblue py-12 font-satoshi text-white"
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
