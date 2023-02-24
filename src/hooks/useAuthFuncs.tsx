import {
  TwitterAuthProvider,
  signInWithPopup,
  GoogleAuthProvider,
  AuthProvider
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
  const { userExists, usernameExists, createUser, docExists } = useFirestore();
  const navigate = useNavigate();
  const TwitterProvider = new TwitterAuthProvider();

  const signIn = async (provider: AuthProvider) => {
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
            navigate("/a/dashboard");
          }
        });
      })
      .catch(error => {
        const errorCode = error.code;
        toast.error(`Error ${errorCode}: Trouble signing in!`);
      });
  };

  const signUp = async (provider: AuthProvider, username: string) => {
    const username_exists = await usernameExists(username);
    if (username_exists) {
      toast.error("Username already exists!");
      return;
    }
    signInWithPopup(auth, provider)
      .then(async result => {
        const doc_exists = await docExists(result.user.uid);
        if (doc_exists) {
          toast.error("Twitter user already has account.");
          return;
        }
        createUser(username, result.user.uid, {
          displayName: result.user.displayName || "",
          photoURL:
            result.user.photoURL ||
            `https://api.dicebear.com/5.x/thumbs/svg?seed=${result.user.uid}`,
          uid: result.user.uid,
          email: result.user.email || ""
        });
        const credential = TwitterAuthProvider.credentialFromResult(result);
        const t = credential?.accessToken;
        const secret = credential?.secret;
        setToken(t);
        setSecret(secret);
        navigate("/a/dashboard");
      })
      .catch(error => {
        const errorCode = error.code;
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
        toast.error(`Error ${errorCode}: Trouble signing in!`);
      });
  };

  const signInTwitter = async () => signIn(TwitterProvider);
  const signUpTwitter = async (username: string) =>
    signUp(TwitterProvider, username);

  return {
    signInTwitter,
    signUpTwitter,
    signOutUser,

    token,
    secret
  };
};

export default useAuthFuncs;
