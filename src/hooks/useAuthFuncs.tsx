import {
  TwitterAuthProvider,
  signInWithPopup,
  GoogleAuthProvider
} from "firebase/auth";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { redirect, useNavigate } from "react-router-dom";
import useFirestore from "./useFirestore";

const useAuthFuncs = () => {
  const [token, setToken] = useState<string>();
  const [secret, setSecret] = useState<string>();
  const { userExists } = useFirestore();
  const navigate = useNavigate();

  const signInTwitter = () => {
    const provider = new TwitterAuthProvider();

    signInWithPopup(auth, provider)
      .then(result => {
        const credential = TwitterAuthProvider.credentialFromResult(result);
        const t = credential?.accessToken;
        const secret = credential?.secret;
        setToken(t);
        setSecret(secret);
        userExists().then(exists => {
          if (exists) navigate("/dashboard");
          else navigate("/init");
        });
      })
      .catch(error => {
        const errorCode = error.code;
        toast.error(`Error ${errorCode}: Trouble signing in!`);
      });
  };

  const signInGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then(result => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const t = credential?.accessToken;
        const secret = credential?.secret;
        setToken(t);
        setSecret(secret);
      })
      .catch(error => {
        const errorCode = error.code;
        const errorMessage = error.message;
        toast.error(`Error ${errorCode}: Trouble signing in!`);
      });
  };

  const signOutUser = () => {
    signOut(auth)
      .then(() => {
        navigate("/");
        toast.success("Signed out!");
      })
      .catch(error => {
        const errorCode = error.code;
        const errorMessage = error.message;
        toast.error(`Error ${errorCode}: Trouble signing in!`);
      });
  };

  return {
    signInTwitter,
    signInGoogle,
    signOutUser,
    token,
    secret
  };
};

export default useAuthFuncs;
