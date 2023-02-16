import clsx from "clsx";

const BioField = (props: {
  content: string;
  title: string;
  bio?: boolean;
  id: string;
}) => {
  return (
    <div
      className={clsx(
        "mt-4 flex flex-col space-y-4 border-2 border-transparent p-4",
        !props.bio && "rounded-xl hover:border-gray-200/10"
      )}
    >
      <div className={clsx("flex items-start", !props.bio && "space-x-4")}>
        <div className="flex flex-col items-start">
          <div className="flex w-fit max-w-sm flex-col rounded-md bg-black px-4 py-1">
            <div className="overflow-hidden">
              <h1
                className={clsx(
                  "text-2xl font-bold",
                  props.bio &&
                    "animate-text bg-gradient-to-r from-purple-500 via-green-500 to-pink-600 bg-clip-text text-transparent"
                )}
                style={{ wordWrap: "break-word" }}
              >
                {props.title}
              </h1>
            </div>
          </div>
          <p className="mx-3 mt-2 whitespace-pre-line text-lg">
            {props.content}
          </p>
        </div>
      </div>
    </div>
  );
};

export default BioField;
