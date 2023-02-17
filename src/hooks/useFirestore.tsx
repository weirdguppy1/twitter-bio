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
import { User } from "firebase/auth";

export type FieldType = {
  title: string;
  content: string;
  id: string;
};

export type LinkType = {
  link: string;
  id: string;
};

export type LinkFieldType = {
  title: string;
  link: string;
  id: string;
};

type UserInfo = {
  displayName: string;
  photoURL: string;
  uid: string;
  email: string;
};

export interface UserDoc {
  links: [LinkType];
  fields: [FieldType];
  socials: [LinkType];
  bio: string;
  username: string;
  user: UserInfo;
}

const useFirestore = () => {
  const [user] = useAuthState(auth);
  const docRef = doc(db, "users", user?.uid || "fallback");

  const createUser = async (username: string, uid: string, user: UserInfo) => {
    await setDoc(doc(db, "users", uid), {
      links: [],
      fields: [],
      bio: "",
      username: username,
      user: user
    });
  };

  const addLink = async (link: string, title: string) => {
    console.log(link, title);
    await updateDoc(docRef, {
      links: arrayUnion({ link: link, title: title, id: nanoid() })
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

  const updateBio = async (content: string) => {
    await updateDoc(docRef, {
      bio: content
    });
  };

  const updateLink = async (id: string, title: string, link: string) => {
    const docSnap = await getDoc(docRef);
    const links: LinkFieldType[] = docSnap.get("links");
    await updateDoc(docRef, {
      links: links.map(linkField =>
        linkField.id === id
          ? { title: title, link: link, id: linkField.id }
          : linkField
      )
    });
  };

  const deleteLink = async (id: string) => {
    const docSnap = await getDoc(docRef);
    const links: LinkFieldType[] = docSnap.get("links");
    await updateDoc(docRef, {
      links: links.filter(link => link.id !== id)
    });
  };
  const updateLinks = async (links: LinkFieldType[]) => {
    await updateDoc(docRef, {
      links: links
    });
  };

  const updateField = async (id: string, title: string, content: string) => {
    const docSnap = await getDoc(docRef);
    const fields: FieldType[] = docSnap.get("fields");
    await updateDoc(docRef, {
      fields: fields.map(field =>
        field.id === id
          ? { title: title, content: content, id: field.id }
          : field
      )
    });
  };

  const updateFields = async (fields: FieldType[]) => {
    await updateDoc(docRef, {
      fields: fields
    });
  };

  const deleteSocial = async (id: string) => {
    const docSnap = await getDoc(docRef);
    const socials: LinkType[] = docSnap.get("socials");
    await updateDoc(docRef, {
      socials: socials.filter(social => social.id !== id)
    });
  };

  const deleteField = async (id: string) => {
    const docSnap = await getDoc(docRef);
    const fields: FieldType[] = docSnap.get("fields");
    await updateDoc(docRef, {
      fields: fields.filter(field => field.id !== id)
    });
  };

  const getUser = async () => {
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data();
    }
  };

  const getUserFromUsername = async (username: string) => {
    const q = query(collection(db, "users"), where("username", "==", username));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.size === 0) {
      return null;
    }
    return querySnapshot.docs[0].data();
  };

  const userExists = async (uid: string) => {
    const docSnap = await getDoc(doc(db, "users", uid));
    return docSnap.exists();
  };

  const usernameExists = async (username: string) => {
    const q = query(collection(db, "users"), where("username", "==", username));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.size > 0) return true;
    return false;
  };

  const docExists = async (id: string) => {
    const d = await getDoc(doc(db, "users", id));
    return d.exists();
  };

  const getUserField = async (fieldValue: string) => {
    const docSnap = await getDoc(docRef);
    return docSnap.get(fieldValue);
  };

  return {
    createUser,
    addLink,
    addField,
    addSocial,
    updateLink,
    deleteLink,
    updateLinks,
    updateBio,
    updateField,
    getUser,
    getUserField,
    getUserFromUsername,
    userExists,
    usernameExists,
    deleteSocial,
    updateFields,
    deleteField,
    docExists
  };
};

export default useFirestore;
