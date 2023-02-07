import React from "react";
import { Toaster } from "react-hot-toast";
import Navbar from "../components/Navbar";

interface Props {
  children: React.ReactNode;
}

export default function Layout(props: Props) {
  return (
    <div className="font-satoshi">
      <Toaster
        position="top-right"
        gutter={4}
        toastOptions={{ className: "bg-tblue px-4 py-2 text-white font-bold" }}
      />
      {props.children}
    </div>
  );
}
