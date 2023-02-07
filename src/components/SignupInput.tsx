import useAuthFuncs from "../hooks/useAuthFuncs";
import Navbar from "./Navbar";
import { useForm } from "react-hook-form";
import useFirestore from "../hooks/useFirestore";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function SignupInput() {
  const { signInTwitter } = useAuthFuncs();
  const { register, handleSubmit } = useForm<{ username: string }>();
  const { usernameExists, createUser } = useFirestore();
  const navigate = useNavigate();

  const onSubmit = handleSubmit(async data => {
    const exists = await usernameExists(data.username);
    if (exists) {
      toast.error("Username already exists!");
    } else {
      createUser(data.username).then(() => navigate("/dashboard"));
    }
  });

  return (
    <form onSubmit={onSubmit}>
      <div className="flex space-x-2 text-xl text-white">
        <div className="rounded-lg bg-gradient-to-r from-pink-500 to-transparent p-1">
          <div className="flex h-full w-full items-center justify-center bg-tblue">
            <div className="flex space-x-2 rounded-xl bg-inherit px-6 py-3">
              <h1>twitterbio.com/</h1>
              <input
                autoComplete="off"
                type="text"
                {...register("username", { required: true })}
                placeholder="yourusername"
                className="bg-inherit text-white placeholder-white placeholder-opacity-50 focus:outline-none"
              />
            </div>{" "}
          </div>
        </div>
        <button
          type="submit"
          className="btn-short btn-white border-2 hover:shadow-gray-500"
        >
          Claim Username
        </button>
      </div>
    </form>
  );
}
