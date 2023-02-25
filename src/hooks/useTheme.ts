export type ThemeNameType =
  | "Midnight"
  | "Honey"
  | "Pinkout"
  | "Emerald"
  | "Blue"
  | "Retro"
  | "Rainbow"
  | "Moody"
  | "Spring";
export type ThemeType = {
  name: ThemeNameType;
  style: string;
  linkStyle: string;
};

const useTheme = () => {
  const themes: ThemeType[] = [
    {
      name: "Midnight",
      style: "text-white bg-tblack",
      linkStyle: "bg-gray-700 text-gray-100/50"
    },
    {
      name: "Blue",
      style: "text-white bg-tblue",
      linkStyle: "bg-white"
    },
    {
      name: "Honey",
      style: "text-black bg-yellow-400",
      linkStyle: "bg-black text-white"
    },
    {
      name: "Emerald",
      style: "text-white bg-emerald-500 font-extrabold",
      linkStyle: "border-2 border-gray-100/25 text-white"
    },
    {
      name: "Spring",
      style: "text-white font-bold font-extrabold bg-teal-500",
      linkStyle: "bg-pink-400 text-white rounded-xl hover:text-white"
    },
    {
      name: "Pinkout",
      style:
        "text-white font-extrabold bg-gradient-to-tr from-pink-500 to-purple-500",
      linkStyle: "bg-gray-100/25 text-black"
    },
    {
      name: "Retro",
      style: "text-black bg-gray-300 font-mono",
      linkStyle: "bg-gray-100/25 text-black"
    },
    {
      name: "Moody",
      style:
        "text-gray-200 font-extrabold bg-gray-300 bg-gradient-to-t from-gray-700 to-gray-500",
      linkStyle:
        "bg-gray-100/25 text-gray-300 rounded-sm shadow-xl border-gray-700 hover:text-white"
    }
  ];

  const getTheme = (themeName: ThemeNameType) =>
    themes.find(theme => theme.name === themeName);

  return {
    themes,
    getTheme
  };
};

export default useTheme;
