import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../../firebase";
import {
  ArrowLeftOnRectangleIcon,
  GlobeAltIcon,
  LinkIcon,
  ShareIcon
} from "@heroicons/react/24/solid";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import useAuthFuncs from "../../hooks/useAuthFuncs";
import logo from "../../assets/images/logo.png";
import useFirestore from "../../hooks/useFirestore";

const DashNav = () => {
  const [user] = useAuthState(auth);

  return (
    <>
      <nav className="bg-tblack p-2 text-white">
        <div className="flex items-center justify-between px-8">
          <div>
            <div className="rounded-xl fill-white p-2.5 text-white">
              <img
                src={logo}
                className="h-10 w-10 rounded-xl fill-white text-white"
              />
              {/* <Logo /> */}
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <ShareDropdown
              activator={
                <button className="btn btn-white py-2 px-6 font-bold text-black">
                  <div className="md:text-md flex items-center space-x-2 text-sm">
                    <span className="">Share</span>
                    <ShareIcon className="h-5 w-5" />
                  </div>
                </button>
              }
            />
            <UserDropdown
              activator={
                <img
                  src={user?.photoURL || ""}
                  className="duration-250 h-10 w-10 rounded-full border-2 border-gray-800 transition hover:cursor-pointer hover:border-gray-700 sm:h-12 sm:w-12"
                />
              }
            />
          </div>
        </div>
      </nav>
    </>
  );
};

function UserDropdown(props: { activator: React.ReactNode }) {
  const [user, loading, error] = useAuthState(auth);
  const { signOutUser } = useAuthFuncs();

  return (
    <Menu as="div" className="relative inline-block text-left">
      <Menu.Button>{props.activator}</Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 mt-3 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1 px-4 text-tblack">
            <h1
              className="text-lg font-bold"
              style={{ wordWrap: "break-word" }}
            >
              {user?.displayName || "User"}
            </h1>
          </div>
          <div className="px-1 py-1 ">
            <Menu.Item>
              {({ active }) => (
                <button
                  className={`${
                    active ? "bg-tblue text-white" : "text-gray-900"
                  } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                >
                  <CrownIcon />
                  <div className="space-x-2">
                    <span>Premium</span>
                    <span className="rounded-full bg-tblack px-4 py-0.5 text-white shadow-lg">
                      Soon!
                    </span>
                  </div>
                </button>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={signOutUser}
                  className={`${
                    active ? "bg-tblue text-white" : "text-gray-900"
                  } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                >
                  {active ? (
                    <ArrowLeftOnRectangleIcon
                      className="mr-2 h-5 w-5"
                      aria-hidden="true"
                    />
                  ) : (
                    <ArrowLeftOnRectangleIcon
                      className="mr-2 h-5 w-5"
                      aria-hidden="true"
                    />
                  )}
                  Logout
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}

function ShareDropdown(props: { activator: React.ReactNode }) {
  const { signOutUser } = useAuthFuncs();
  const { getUserField } = useFirestore();
  const [username, setUsername] = useState<string>();

  useEffect(() => {
    getUserField("username").then(val => setUsername(val));
  }, []);

  return (
    <Menu as="div" className="relative inline-block text-left">
      <Menu.Button>{props.activator}</Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 mt-3 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1 px-4 text-tblack">
            <h1
              className="text-lg font-bold"
              style={{ wordWrap: "break-word" }}
            >
              Share
            </h1>
          </div>
          <div className="px-1 py-1 ">
            <Menu.Item>
              {({ active }) => (
                <a
                  href={username || "dashboard"}
                  target="_blank"
                  className={`${
                    active ? "bg-tblue text-white" : "text-gray-900"
                  } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                >
                  <div className="flex items-center space-x-2">
                    <LinkIcon className="h-5 w-5" />
                    {/* <h1 className="text-purple-500 font-bold text-xxs">{`${window.location.origin}/${username}`}</h1> */}
                    <h1>Bio Link</h1>
                  </div>
                </a>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}

const CrownIcon = () => {
  return (
    <svg
      className="mr-2 h-5 w-5 fill-[#FFD700]"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 576 512"
    >
      <path d="M309 106c11.4-7 19-19.7 19-34c0-22.1-17.9-40-40-40s-40 17.9-40 40c0 14.4 7.6 27 19 34L209.7 220.6c-9.1 18.2-32.7 23.4-48.6 10.7L72 160c5-6.7 8-15 8-24c0-22.1-17.9-40-40-40S0 113.9 0 136s17.9 40 40 40c.2 0 .5 0 .7 0L86.4 427.4c5.5 30.4 32 52.6 63 52.6H426.6c30.9 0 57.4-22.1 63-52.6L535.3 176c.2 0 .5 0 .7 0c22.1 0 40-17.9 40-40s-17.9-40-40-40s-40 17.9-40 40c0 9 3 17.3 8 24l-89.1 71.3c-15.9 12.7-39.5 7.5-48.6-10.7L309 106z" />
    </svg>
  );
};

export default DashNav;
