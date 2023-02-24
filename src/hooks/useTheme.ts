import { doc } from "firebase/firestore";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { auth, db } from "../../firebase";

const useTheme = () => {
  const [user] = useAuthState(auth);
  const [data] = useDocumentData(doc(db, "users", user?.uid || "fallback"));
};

export default useTheme;
