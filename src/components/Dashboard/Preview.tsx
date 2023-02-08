import { DocumentData } from "firebase/firestore";
import React from "react";
import { FieldType, LinkType, UserDoc } from "../../hooks/useFirestore";
import Field from "../Content/Field";
import Social from "../Content/Social";

const Preview = ({ data }: { data?: DocumentData }) => {
  return (
    <div className="flex h-[75vh] w-[30rem] flex-col rounded-xl border-2 border-gray-100/25 px-12 py-8 shadow-xl">
      <div className="flex flex-col items-center space-y-2">
        <img src={data?.user?.photoURL} className="h-10 w-10 rounded-xl" />
        <h1 className="text-4xl font-extrabold">{data?.user?.displayName}</h1>
        <div className="rounded-full bg-white py-[1px] px-8" />
        <div className="flex max-w-lg space-x-1">
          {data?.socials?.map((field: LinkType) => {
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
          })}
        </div>
      </div>
      <Field bio title="About" content={data?.bio} />
      <div className="">
        {data?.fields?.map((field: FieldType) => (
          <Field key={field.id} title={field.title} content={field.content} />
        ))}
      </div>
    </div>
  );
};

export default Preview;
