import React from "react";
import {
  FaFacebook,
  FaGithub,
  FaInstagram,
  FaSpotify,
  FaTiktok,
  FaTwitter,
  FaYoutube
} from "react-icons/fa";

const Social = (props: {
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

  return (
    <a target="_blank" href={props.link}>
      {iconMap[props.domain]}
    </a>
  );
};

export default Social;
