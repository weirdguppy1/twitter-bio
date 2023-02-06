import {
  updateDoc,
  doc,
  setDoc,
  arrayUnion,
  getDoc,
  DocumentData,
  query,
  collection,
  where,
  getDocs
} from "firebase/firestore";
import { auth, db } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { nanoid } from "nanoid";

export type Field = {
  title: string;
  content: string;
  id: string;
};

export type Link = {
  link: string;
  id: string;
};

export interface UserDoc extends DocumentData {
  links: [Link];
  fields: [Field];
  socials: [Link];
  bio: string;
  username: string;
}

const useFirestore = () => {
  const [user] = useAuthState(auth);
  const docRef = doc(db, "users", user?.uid || "fallback");

  const createUser = async (username: string) => {
    await setDoc(docRef, {
      links: [],
      fields: [],
      bio: "",
      username: username
    });
  };

  const addLink = async (link: string) => {
    await updateDoc(docRef, {
      links: arrayUnion({ link: link, id: nanoid() })
    });
  };

  const addField = async (title: string, content: string) => {
    await updateDoc(docRef, {
      fields: arrayUnion({ title: title, content: content, id: nanoid() })
    });
  };

  const addSocial = async (link: string) => {
    await updateDoc(docRef, {
      socials: arrayUnion({ link: link, id: nanoid() })
    });
  };

  const updateLink = async (id: string) => {
    const docSnap = await getDoc(docRef);
    const links: [Link] = docSnap.get("links");
    await updateDoc(docRef, {
      links: links.filter(link => link.id !== id)
    });
  };

  const updateField = async (id: string) => {
    const docSnap = await getDoc(docRef);
    const links: [Field] = docSnap.get("fields");
    await updateDoc(docRef, {
      links: links.filter(link => link.id !== id)
    });
  };

  const getUser = async () => {
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data();
    }
  };

  const userExists = async () => {
    const docSnap = await getDoc(docRef);
    return docSnap.exists();
  };

  const usernameExists = async (username: string) => {
    const q = query(collection(db, "users"), where("username", "==", username));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.size > 0) return true;
    return false;
  };

  return {
    createUser,
    addLink,
    addField,
    updateLink,
    updateField,
    getUser,
    userExists,
    usernameExists
  };
};

export default useFirestore;
