import React from "react";
import Navbar from "../components/Navbar";

interface Props {
  children: React.ReactNode;
}

export default function Layout(props: Props) {
  return (
    <div className="font-satoshi">
      {/* <Navbar /> */}
      {props.children}
    </div>
  );
}
