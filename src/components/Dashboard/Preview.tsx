import { DocumentData } from "firebase/firestore";
import React from "react";
import { FieldType, LinkType, UserDoc } from "../../hooks/useFirestore";
import Field from "../Content/Field";

const Preview = ({ data }: { data?: DocumentData }) => {
  return (
    <div className="flex h-[75vh] w-96 flex-col rounded-xl border-2 border-gray-100/25 px-10 py-4 shadow-xl">
      <div className="flex flex-col items-center space-y-2">
        <img src={data?.user?.photoURL} className="h-10 w-10 rounded-xl" />
        <h1 className="text-4xl font-bold">{data?.user?.displayName}</h1>
      </div>
      <h1 className="mt-4 animate-text bg-gradient-to-r from-tblue to-purple-500 bg-clip-text text-4xl font-extrabold  ">
        Bio
      </h1>
      <Field title="" content={data?.bio} />
      {data?.fields?.map((field: FieldType) => (
        <Field key={field.id} title={field.title} content={field.content} />
      ))}
    </div>
  );
};

export default Preview;
