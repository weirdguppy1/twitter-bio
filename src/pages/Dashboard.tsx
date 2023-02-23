import DashNav from "../components/Dashboard/DashNav";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";
import BioCreator from "../components/Dashboard/BioCreator";

export default function Dashboard() {
  const [user] = useAuthState(auth);

  return (
    <>
      <DashNav />
      <main
        id="auth"
        className="flex min-h-screen flex-col items-center bg-tblue font-satoshi text-white sm:py-4"
      >
        {/* <h1 className="text-4xl">
          Hello,{" "}
          <span className="font-bold">{user?.displayName || "User"}</span>
        </h1> */}
        <BioCreator />
      </main>
    </>
  );
}
