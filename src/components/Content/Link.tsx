import { LinkIcon } from "@heroicons/react/24/solid";
import clsx from "clsx";
import React from "react";

const Link = (props: { link: string; title: string; id: string }) => {
  return (
    <a target="_blank" href={props.link}>
      <div className="duration-250 mt-4 flex items-center space-x-4 rounded-2xl bg-white px-2 py-3 text-black shadow-lg transition hover:scale-[1.15] hover:shadow-xl">
        <div className="rounded-full bg-black p-2">
          <LinkIcon className="h-5 w-5 fill-white" />
        </div>
        <h1 className="text-md font-bold">{props.title}</h1>
      </div>
    </a>
  );
};

export default Link;
