import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useFirestore, { FieldType } from "../../hooks/useFirestore";
import useUser from "../../hooks/useUser";
import Field from "../Content/Field";
import AddField from "./AddField";
import AddLink from "./AddLink";
import AddSocial from "./AddSocial";

const ContentCreator = () => {
  const { updateBio } = useFirestore();
  const [fields, setFields] = useState<FieldType[]>([]);
  const { register, handleSubmit, setValue } = useForm<{ bio: string }>();
  const onSubmit = handleSubmit(data => {
    updateBio(data.bio);
  });
  const [value] = useUser();

  useEffect(() => {
    setValue("bio", value?.data()?.bio);
    setFields(value?.data()?.fields);
  }, [value]);

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
        <div className="mt-4 flex flex-col space-y-4">
          <h1 className="text-2xl font-bold underline decoration-blue-300 decoration-wavy">
            <div className="flex items-center">
              <span>Your Bio</span>
              {/* <InformationCircleIcon id="bio-info-tooltip" className="h-5 w-5 fill-white" />
              <Tooltip anchorId="bio-info-tooltip" content="hello world!" /> */}
            </div>
          </h1>
          <form onClick={onSubmit} className="flex flex-col space-y-2">
            <textarea
              {...register("bio", { required: false })}
              className="input h-48 w-96 resize-none border-none bg-inherit bg-[#109cf1] text-white placeholder-gray-100"
              placeholder="Write your bio here with no limit..."
            />
            <button className="btn-short btn-blue ">Save</button>
          </form>
        </div>
        {fields?.map(field => (
          <Field key={field.id} title={field.title} content={field.content} />
        ))}
      </div>
    </div>
  );
};

export default ContentCreator;
