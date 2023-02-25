import { DocumentData } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { ImSpinner } from "react-icons/im";
import { Link, useParams } from "react-router-dom";
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
import useTheme, { ThemeType } from "../hooks/useTheme";

const Bio = () => {
  const { getUserFromUsername, usernameExists } = useFirestore();
  const { getTheme } = useTheme();
  const [data, setData] = useState<DocumentData>();
  const [loading, setLoading] = useState<boolean>(false);
  const [userFound, setUserFound] = useState<boolean>(true);
  const [show, setShow] = useState<boolean>(false);
  const [themeValue, setThemeValue] = useState<ThemeType>();

  const { username } = useParams<{ username: string }>();

  useEffect(() => {
    if (username) {
      setLoading(true);
      usernameExists(username).then(value => {
        setUserFound(value);
        if (value) {
          getUserFromUsername(username).then(value => {
            if (value) {
              setThemeValue(getTheme(value?.settings?.theme));
              setData(value);
              console.log(themeValue);
            }
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
    <div className={clsx("min-h-screen py-12 px-2 md:px-0", themeValue?.style)}>
      <div className="min-h-md cursor flex flex-col rounded-xl">
        <div
          className={clsx(
            "items-center space-y-2",
            show ? "flex flex-col items-center" : "hidden"
          )}
        >
          <img src={data?.user.photoURL} className="h-15 w-15 rounded-xl" />
          <h1 className="text-4xl font-extrabold">{data?.user.displayName}</h1>
          <h1 className="text-2xl font-extrabold">@{data?.username}</h1>
          <div className="rounded-full bg-white py-[1px] px-8" />
          <div className="min-w-md flex max-w-md space-x-1">
            {data?.socials?.map((social: LinkType) => {
              const domain = new URL(social.link).hostname
                .replace("www.", "")
                .split(".")[0];
              return (
                <BioSocial key={social.id} link={social.link} domain={domain} />
              );
            })}
          </div>
          <div className="min-w-md flex max-w-md flex-col space-y-4 px-8 sm:px-0">
            <div className="flex flex-col items-start space-y-1">
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
            <div className="flex flex-col space-y-1">
              {data?.links?.map((link: LinkFieldType) => {
                return (
                  <BioLink
                    linkStyle={themeValue?.linkStyle || ""}
                    key={link.id}
                    link={link.link}
                    title={link.title}
                    id={link.id}
                  />
                );
              })}
            </div>
            <Link to="/">
              <div className="flex justify-center space-x-3 rounded-xl px-6 py-3 transition hover:bg-gray-300/[0.2] hover:text-white">
                <img
                  src={Logo}
                  className="h-12 w-12 rounded-xl md:h-14 md:w-14 xl:h-16 xl:w-16"
                />
                <h1 className="inline-flex items-center text-sm sm:text-lg md:text-xl">
                  Upgrade your bio!
                </h1>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bio;
