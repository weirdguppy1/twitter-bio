import { Popover, Transition } from "@headlessui/react";
import React, { Fragment } from "react";
import {
  FaFacebook,
  FaGithub,
  FaInstagram,
  FaSpotify,
  FaTiktok,
  FaTwitter,
  FaYoutube
} from "react-icons/fa";
import clsx from "clsx";
import { LinkIcon, TrashIcon } from "@heroicons/react/24/solid";
import useFirestore from "../../hooks/useFirestore";

const Social = (props: {
  id: string;
  link: string;
  domain: string;
  // | "instagram"
  // | "twitter"
  // | "tiktok"
  // | "youtube"
  // | "github"
  // | "facebook"
  // | "spotify";
}) => {
  console.log(props.domain);
  const iconMap: { [k: string]: React.ReactNode } = {
    instagram: (
      <FaInstagram className="h-6 w-6 fill-white transition hover:brightness-75" />
    ),
    twitter: (
      <FaTwitter className="h-6 w-6 fill-white transition hover:brightness-75" />
    ),
    tiktok: <FaTiktok className="h-6 w-6 transition hover:brightness-75" />,
    youtube: (
      <FaYoutube className="h-6 w-6 fill-white transition hover:brightness-75" />
    ),
    github: (
      <FaGithub className="h-6 w-6 fill-white transition hover:brightness-75" />
    ),
    facebook: (
      <FaFacebook className="h-6 w-6 fill-white transition hover:brightness-75" />
    ),
    spotify: (
      <FaSpotify className="h-6 w-6 fill-white transition hover:brightness-75" />
    )
  };

  const { deleteSocial } = useFirestore();

  return (
    <>
      <Popover className="relative">
        {({ open }) => (
          <>
            <Popover.Button>
              <a
                className={clsx(open && "fill-red-300")}
                target="_blank"
                href={props.link}
              >
                {iconMap[props.domain]}
              </a>
            </Popover.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute left-1/2 z-10 mt-1 w-24 max-w-sm -translate-x-1/2 transform px-4 sm:px-0 lg:max-w-3xl">
                <div className="overflow-hidden rounded-lg bg-white px-4 py-2 text-black shadow-lg ring-1 ring-black ring-opacity-5">
                  <div className="flex items-center justify-center space-x-2">
                    <a href={props.link} target="_blank">
                      <LinkIcon className="h-5 w-5 fill-black" />
                    </a>
                    <button onClick={() => deleteSocial(props.id)}>
                      <TrashIcon className="duration-250 h-5 w-5 fill-black transition hover:fill-gray-500" />
                    </button>
                  </div>
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    </>
  );
};

export default Social;
