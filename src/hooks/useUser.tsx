import { doc, DocumentData, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../firebase";
import useFirestore from "./useFirestore";
import { useDocument } from "react-firebase-hooks/firestore";

const useUser = () => {
  // const [data, setData] = useState<DocumentData>();
  const [user] = useAuthState(auth);

  // const { getUser } = useFirestore();

  // useEffect(() => {
  //   getUser().then(value => {setData(value)});
  //   const unsub = onSnapshot(doc(db, "users", user?.uid || ""), doc => {
  //     setData(doc.data());
  //   });
  //   return () => unsub();
  // }, []);
  // return { data };
  return useDocument(doc(db, "users", user?.uid || "fallback"));
};

export default useUser;
