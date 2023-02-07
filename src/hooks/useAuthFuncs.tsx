import {
  TwitterAuthProvider,
  signInWithPopup,
  GoogleAuthProvider
} from "firebase/auth";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";
import useFirestore from "./useFirestore";

const useAuthFuncs = () => {
  const [token, setToken] = useState<string>();
  const [secret, setSecret] = useState<string>();
  const { userExists, usernameExists, createUser } = useFirestore();
  const navigate = useNavigate();

  const signInTwitter = async () => {
    const provider = new TwitterAuthProvider();

    signInWithPopup(auth, provider)
      .then(result => {
        userExists(result.user.uid).then(exists => {
          if (!exists) {
            toast.error("Must sign up first.");
          } else {
            const credential = TwitterAuthProvider.credentialFromResult(result);
            const t = credential?.accessToken;
            const secret = credential?.secret;
            setToken(t);
            setSecret(secret);
            navigate("/dashboard");
          }
        });
      })
      .catch(error => {
        const errorCode = error.code;
        toast.error(`Error ${errorCode}: Trouble signing in!`);
      });
  };

  const signUpTwitter = async (username: string) => {
    const provider = new TwitterAuthProvider();
    const username_exists = await usernameExists(username);
    if (username_exists) {
      toast.error("Username already exists!");
      return;
    }

    signInWithPopup(auth, provider)
      .then(result => {
        createUser(username, result.user.uid);
        const credential = TwitterAuthProvider.credentialFromResult(result);
        const t = credential?.accessToken;
        const secret = credential?.secret;
        setToken(t);
        setSecret(secret);
        navigate("/dashboard");
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
    signUpTwitter,
    signInGoogle,
    signOutUser,

    token,
    secret
  };
};

export default useAuthFuncs;
