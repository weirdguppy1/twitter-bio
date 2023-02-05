import React from "react";
import {
  HandThumbUpIcon,
  HeartIcon,
  PaintBrushIcon
} from "@heroicons/react/24/solid";
import Navbar from "../components/Navbar";

export default function Home() {
  const scrollTop = () => {
    document.getElementById("top")?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <>
      <Navbar />
      <main
        id="top"
        className="flex min-h-screen flex-col items-center justify-center bg-tblue font-satoshi text-white"
      >
        <section className="flex flex-col items-center space-y-4">
          <div className="flex items-center space-x-4">
            <svg fill="currentColor" className="h-20 w-20" viewBox="0 0 16 16">
              <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z" />
            </svg>
            <h1 className="text-8xl font-bold">Twitter Bio</h1>
          </div>
          <div className="max-w-xl rounded-xl bg-black px-6 py-2 shadow-xl">
            <p className="animate-text bg-gradient-to-r from-tblue to-purple-500 bg-clip-text text-xl font-extrabold text-transparent">
              <span className="font-mono">Level up! </span> Take your Twitter
              bio to the next level.
            </p>
          </div>
          <div className="flex space-x-2 text-xl text-white">
            <div className="rounded-lg bg-gradient-to-r from-pink-500 to-transparent p-1">
              <div className="flex h-full w-full items-center justify-center bg-tblue">
                <div className="flex space-x-2 rounded-xl bg-inherit px-6 py-3">
                  <h1>twitterbio.com/</h1>
                  <input
                    placeholder="yourusername"
                    className="bg-inherit text-white placeholder-white placeholder-opacity-50 focus:outline-none"
                  />
                </div>{" "}
              </div>
            </div>
            <button className="btn btn-white border-2 border-black">
              Claim your Twitter bio
            </button>
          </div>
        </section>
        <section className="mx-4 mt-24 flex flex-col space-y-8">
          <div className="flex items-center space-x-4">
            <h1 className="text-4xl font-bold">Features you'll love </h1>
            <HeartIcon className="h-8 w-8 animate-pulse fill-red-500" />
          </div>
          <div className="grid-row-2 grid grid-cols-2 gap-4">
            <FeatureCard title="Longer word limit!" icon={<HandThumbUpIcon />}>
              It's hard to describe yourself in 160 characters. Say goodbye to
              the 160 word limit for your Twitter bio!
            </FeatureCard>
            <FeatureCard title="Customization" icon={<PaintBrushIcon />}>
              Customize your Twitter bio link with different themes and colors!
            </FeatureCard>
            <FeatureCard
              title="Add fields + Socials"
              icon={<HandThumbUpIcon />}
            >
              Tired of only one paragraph for your bio? Add more text fields to
              describe your job, passions, etc.
            </FeatureCard>
            <FeatureCard
              title="AI Powered"
              icon={
                <svg fill="currentColor" viewBox="0 0 16 16">
                  <path d="M6 12.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5ZM3 8.062C3 6.76 4.235 5.765 5.53 5.886a26.58 26.58 0 0 0 4.94 0C11.765 5.765 13 6.76 13 8.062v1.157a.933.933 0 0 1-.765.935c-.845.147-2.34.346-4.235.346-1.895 0-3.39-.2-4.235-.346A.933.933 0 0 1 3 9.219V8.062Zm4.542-.827a.25.25 0 0 0-.217.068l-.92.9a24.767 24.767 0 0 1-1.871-.183.25.25 0 0 0-.068.495c.55.076 1.232.149 2.02.193a.25.25 0 0 0 .189-.071l.754-.736.847 1.71a.25.25 0 0 0 .404.062l.932-.97a25.286 25.286 0 0 0 1.922-.188.25.25 0 0 0-.068-.495c-.538.074-1.207.145-1.98.189a.25.25 0 0 0-.166.076l-.754.785-.842-1.7a.25.25 0 0 0-.182-.135Z" />
                  <path d="M8.5 1.866a1 1 0 1 0-1 0V3h-2A4.5 4.5 0 0 0 1 7.5V8a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1v1a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-1a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1v-.5A4.5 4.5 0 0 0 10.5 3h-2V1.866ZM14 7.5V13a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V7.5A3.5 3.5 0 0 1 5.5 4h5A3.5 3.5 0 0 1 14 7.5Z" />
                </svg>
              }
            >
              Use and prompt artificial intelligence to help you create the
              perfect bio for your Twitter.
            </FeatureCard>
          </div>
        </section>
      </main>
      <svg
        className="bg-tblue"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
      >
        <path
          className="fill-gray-800"
          fillOpacity="1"
          d="M0,160L20,160C40,160,80,160,120,176C160,192,200,224,240,229.3C280,235,320,213,360,202.7C400,192,440,192,480,176C520,160,560,128,600,106.7C640,85,680,75,720,90.7C760,107,800,149,840,149.3C880,149,920,107,960,90.7C1000,75,1040,85,1080,122.7C1120,160,1160,224,1200,256C1240,288,1280,288,1320,277.3C1360,267,1400,245,1420,234.7L1440,224L1440,320L1420,320C1400,320,1360,320,1320,320C1280,320,1240,320,1200,320C1160,320,1120,320,1080,320C1040,320,1000,320,960,320C920,320,880,320,840,320C800,320,760,320,720,320C680,320,640,320,600,320C560,320,520,320,480,320C440,320,400,320,360,320C320,320,280,320,240,320C200,320,160,320,120,320C80,320,40,320,20,320L0,320Z"
        ></path>
      </svg>
      <div className="-m-1" />
      <main className="bg-gray-800 font-satoshi text-white">
        <div className="flex flex-col items-center space-y-8 p-4">
          <h1 className="text-center text-6xl font-bold">
            Join 100+ Twitter users to create the perfect bio!
          </h1>
          <button
            onClick={() => scrollTop()}
            className="btn btn-white !border-none text-xl"
          >
            Create my link.
          </button>
        </div>
        {/* <footer className="bg-gray-900 p-4 mt-10">
          <div className="flex flex-col">
            <ul>
              <li className="transition duration-200 hover:cursor-pointer hover:text-gray-300">
                Account
              </li>
              <li className="transition duration-200 hover:cursor-pointer hover:text-gray-300">
                Account
              </li>
              <li className="transition duration-200 hover:cursor-pointer hover:text-gray-300">
                Account
              </li>
            </ul>
          </div>
        </footer> */}
      </main>
    </>
  );
}

interface FeatureCardProps {
  title: string;
  children: React.ReactNode;
  icon: React.ReactNode;
}

const FeatureCard = ({ title, icon, children }: FeatureCardProps) => {
  return (
    <div className="max-w-sm rounded-xl px-4 py-2">
      <div className="">
        <div className="mb-4 w-fit animate-text rounded-xl bg-gradient-to-r from-purple-500 to-red-500 p-3">
          <div className="h-8 w-8">{icon}</div>
        </div>
        <div className="flex flex-col space-y-2">
          <h1 className="text-2xl font-bold">{title}</h1>
          <div className="text-xl">{children}</div>
        </div>
      </div>
    </div>
  );
};
