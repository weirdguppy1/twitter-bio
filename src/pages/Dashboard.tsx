import React, { Children } from "react";
import {
  HandThumbUpIcon,
  HeartIcon,
  PaintBrushIcon
} from "@heroicons/react/24/solid";
import useAuthFuncs from "../hooks/useAuthFuncs";

export default function Dashboard() {
  const { signOutUser } = useAuthFuncs();

  return (
    <main
      id="auth"
      className="flex h-screen flex-col items-center  bg-tblue font-satoshi text-white"
    >
      <h1 className="text-7xl font-bold">Dashboard</h1>
      <button onClick={signOutUser}>Out</button>
    </main>
  );
}
