import { LinkIcon } from "@heroicons/react/24/solid";
import clsx from "clsx";

const BioLink = (props: {
  link: string;
  title: string;
  id: string;
  linkStyle: string;
}) => {
  return (
    <div className="flex flex-col">
      <a target="_blank" href={props.link}>
        <div
          className={clsx(
            "duration-250 mt-2 flex items-center space-x-4 rounded-2xl  px-2 py-3  shadow-lg transition hover:scale-[1.02] hover:shadow-xl",
            props.linkStyle
          )}
        >
          <div className="rounded-full bg-black p-2">
            <LinkIcon className="h-5 w-5 fill-white" />
          </div>
          <div className="overflow-hidden">
            <h1
              className="text-md font-bold"
              style={{ wordWrap: "break-word" }}
            >
              {props.title}
            </h1>
          </div>
        </div>
      </a>
    </div>
  );
};

export default BioLink;
