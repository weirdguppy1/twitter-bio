import { DocumentData } from "firebase/firestore";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import useFirestore from "../../../hooks/useFirestore";
import AddField from "./AddItems/AddField";
import AddLink from "./AddItems/AddLink";
import AddSocial from "./AddItems/AddSocial";
import { AiFillRobot } from "react-icons/ai";
import BioGenerate from "./BioGenerate";

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
    <div className="mt-4 flex flex-col items-start rounded-xl md:mt-8 xl:mt-0">
      <div className="flex w-screen flex-col p-4 md:w-full md:p-0">
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
              className="input mt-3 h-48 w-full resize-none border-none bg-inherit bg-[#109cf1] text-white placeholder-gray-100/50 md:w-[40rem] md:p-4 lg:h-56 xl:h-60 xl:w-96"
              placeholder="Write your bio here with no limit..."
            />
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
