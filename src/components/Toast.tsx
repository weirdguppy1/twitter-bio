import React from "react";
import toast from "react-hot-toast";

const Toast = (message: string) =>
  toast(message, {
    position: "top-right",
    style: {
      padding: "16px",
      color: "white",
      backgroundColor: "#1DA1F2"
    }
    // iconTheme: {
    //   primary: "#1DA1F2",
    //   secondary: "#FFFAEE"
    // }
  });

export default Toast;
