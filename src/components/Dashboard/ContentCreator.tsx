import { DocumentData } from "firebase/firestore";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import useFirestore from "../../hooks/useFirestore";
import AddField from "./AddField";
import AddLink from "./AddLink";
import AddSocial from "./AddSocial";
import { AiFillRobot } from "react-icons/ai";
import BioGenerate from "../Creator/BioGenerate";

const ContentCreator = ({ data }: { data?: DocumentData }) => {
  const { updateBio } = useFirestore();
  const { register, handleSubmit, setValue } = useForm<{ bio: string }>();
  const onSubmit = handleSubmit(data => {
    updateBio(data.bio);
  });

  useEffect(() => {
    if (data) {
      setValue("bio", data?.bio);
    }
  }, [data]);

  return (
    <div className="mt-12 flex flex-col items-start rounded-xl">
      <div className="flex flex-col">
        <div className="flex flex-col space-y-2">
          <div className="flex w-full items-center space-x-2">
            <AddField />
            <AddLink />
          </div>
          <AddSocial />
        </div>
        <div className="mt-4 flex flex-col space-y-2">
          <h1 className="text-2xl font-bold underline decoration-blue-300 decoration-wavy">
            <div className="flex items-center">
              <span>Your Bio</span>
              {/* <InformationCircleIcon id="bio-info-tooltip" className="h-5 w-5 fill-white" />
              <Tooltip anchorId="bio-info-tooltip" content="hello world!" /> */}
            </div>
          </h1>
          <form onClick={onSubmit} className="flex flex-col space-y-2">
            <textarea
              spellCheck={false}
              {...register("bio", { required: false })}
              className="input mt-3 h-48 w-96 resize-none border-none bg-inherit bg-[#109cf1] text-white placeholder-gray-100/50"
              placeholder="Write your bio here with no limit..."
            />
            {/*
            <Picker
              data={emojiData}
              theme="light"
              navPosition="bottom"
              previewPosition="none"
              categories={[
                "people",
                "nature",
                "foods",
                "activity",
                "places",
                "objects",
                "symbols",
                "flags"
              ]}
            /> */}
            <button type="submit" className="btn-short btn-blue">
              Save
            </button>
          </form>
          <BioGenerate />
        </div>
      </div>
    </div>
  );
};

export default ContentCreator;
