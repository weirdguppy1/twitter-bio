import { DocumentData } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { ImSpinner } from "react-icons/im";
import { useParams } from "react-router-dom";
import BioField from "../components/BioLink/BioField";
import BioLink from "../components/BioLink/BioLink";
import useFirestore, {
  FieldType,
  LinkFieldType,
  LinkType
} from "../hooks/useFirestore";
import Logo from "../assets/images/logo.png";
import PageEnd from "../components/PageEnd";
import BioSocial from "../components/BioLink/BioSocial";
import clsx from "clsx";

const Bio = () => {
  const { getUserFromUsername, usernameExists } = useFirestore();
  const [data, setData] = useState<DocumentData>();
  const [loading, setLoading] = useState<boolean>(false);
  const [userFound, setUserFound] = useState<boolean>(true);
  const [show, setShow] = useState<boolean>(false);

  const { username } = useParams<{ username: string }>();

  useEffect(() => {
    if (username) {
      setLoading(true);
      usernameExists(username).then(value => {
        setUserFound(value);
        if (value) {
          getUserFromUsername(username).then(value => {
            if (value) setData(value);
            setLoading(false);
            setShow(true);
          });
        }
      });
    }
  }, []);

  if (!userFound)
    return (
      <div className="flex h-screen flex-col items-center justify-center space-y-8 bg-tblue p-12 text-white">
        <h1 className="text-2xl font-extrabold sm:text-3xl md:text-5xl">
          Could not find user...
        </h1>
        <PageEnd />
      </div>
    );

  if (loading)
    return (
      <div className="flex h-screen flex-col items-center justify-center bg-tblue">
        <ImSpinner className="h-5 w-5 animate-spin fill-white" />
      </div>
    );

  return (
    <div className="min-h-screen bg-tblue py-24 text-white">
      <div className="min-h-md cursor flex flex-col rounded-xl">
        <div
          className={clsx(
            "items-center space-y-2",
            show ? "flex flex-col" : "hidden"
          )}
        >
          <img src={data?.user.photoURL} className="h-15 w-15 rounded-xl" />
          <h1 className="text-4xl font-extrabold">{data?.user.displayName}</h1>
          <h1 className="text-2xl font-extrabold text-gray-100/50">
            @{data?.username}
          </h1>
          <div className="rounded-full bg-white py-[1px] px-8" />
          <div className="flex max-w-lg space-x-1">
            {data?.socials?.map((social: LinkType) => {
              const domain = new URL(social.link).hostname
                .replace("www.", "")
                .split(".")[0];
              return (
                <BioSocial key={social.id} link={social.link} domain={domain} />
              );
            })}
          </div>
          <div className="flex w-[35rem] flex-col items-start space-y-1">
            <BioField bio content={data?.bio} title="Bio" id="bio" />
            {data?.fields?.map((field: FieldType) => {
              return (
                <BioField
                  content={field.content}
                  title={field.title}
                  key={field.id}
                  id={field.id}
                />
              );
            })}
          </div>
          <div className="flex w-[35rem] flex-col space-y-1">
            {data?.links?.map((link: LinkFieldType) => {
              return (
                <BioLink
                  key={link.id}
                  link={link.link}
                  title={link.title}
                  id={link.id}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bio;
