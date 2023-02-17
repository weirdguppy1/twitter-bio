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

const BioSocial = (props: { link: string; domain: string }) => {
  const iconMap: { [k: string]: React.ReactNode } = {
    instagram: (
      <FaInstagram className="h-6 w-6 fill-white transition hover:fill-pink-500 hover:brightness-75" />
    ),
    twitter: (
      <FaTwitter className="h-6 w-6 fill-white transition hover:fill-tblue  hover:brightness-75" />
    ),
    tiktok: (
      <FaTiktok className="h-6 w-6 transition hover:fill-purple-500  hover:brightness-75" />
    ),
    youtube: (
      <FaYoutube className="h-6 w-6 fill-white transition hover:fill-red-500  hover:brightness-75" />
    ),
    github: (
      <FaGithub className="h-6 w-6 fill-white transition hover:fill-black hover:brightness-75" />
    ),
    facebook: (
      <FaFacebook className="h-6 w-6 fill-white transition hover:fill-blue-500  hover:brightness-75" />
    ),
    spotify: (
      <FaSpotify className="h-6 w-6 fill-white transition hover:fill-green-500  hover:brightness-75" />
    )
  };

  return (
    <a className="" target="_blank" href={props.link}>
      {iconMap[props.domain]}
    </a>
  );
};

export default BioSocial;
