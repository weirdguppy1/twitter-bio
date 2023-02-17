import { DocumentData } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { ImSpinner } from "react-icons/im";
import { useParams } from "react-router-dom";
import BioField from "../components/BioLink/BioField";
import BioLink from "../components/BioLink/BioLink";
import useFirestore, { FieldType, LinkFieldType } from "../hooks/useFirestore";
import Logo from "../assets/images/logo.png";
import PageEnd from "../components/PageEnd";

const Bio = () => {
  const { getUserFromUsername } = useFirestore();
  const [data, setData] = useState<DocumentData>();
  const [loading, setLoading] = useState<boolean>(false);
  const { username } = useParams<{ username: string }>();

  useEffect(() => {
    if (username) {
      setLoading(true);
      getUserFromUsername(username).then(value => {
        if (value) setData(value);
        setLoading(false);
      });
    }
  }, []);

  if (loading) return <ImSpinner className="h-5 w-5 animate-spin fill-white" />;
  if (!data)
    return (
      <div className="flex h-screen flex-col items-center justify-center space-y-8 bg-tblue text-white">
        <h1 className="text-3xl font-extrabold">Could not find user...</h1>
        <PageEnd />
      </div>
    );

  return (
    <div className="min-h-screen bg-tblue py-24 text-white">
      <div className="min-h-md cursor flex flex-col rounded-xl">
        <div className="flex flex-col items-center space-y-2">
          <img src={data.user.photoURL} className="h-15 w-15 rounded-xl" />
          <h1 className="text-4xl font-extrabold">{data.user.displayName}</h1>
          <h1 className="bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-2xl font-extrabold text-transparent">
            @{data.username}
          </h1>
          <div className="rounded-full bg-white py-[1px] px-8" />
          <div className="flex max-w-lg space-x-1">
            {/* {data.socials.map((field: LinkType) => {
            const domain = new URL(field.link).hostname
              .replace("www.", "")
              .split(".")[0];
            return (
              <Social
                key={field.id}
                id={field.id}
                link={field.link}
                domain={domain}
              />
            );
          })} */}
          </div>
          <div className="flex w-[35rem] flex-col items-start space-y-4">
            <BioField
              bio
              content={data.bio === "" ? data.bio : "No bio."}
              title="Bio"
              id="bio"
            />
            {data.fields.map((field: FieldType) => {
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
          <div className="mt-10 flex w-[35rem] flex-col space-y-5">
            {data.links.map((link: LinkFieldType) => {
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
