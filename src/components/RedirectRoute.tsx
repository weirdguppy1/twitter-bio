import { useAuthState } from "react-firebase-hooks/auth";
import { Navigate } from "react-router-dom";
import { auth } from "../../firebase";

interface Props {
  children: React.ReactNode;
  url: string;
}

const RedirectRoute = ({ children, url }: Props) => {
  const [user, loading, error] = useAuthState(auth);

  if (loading) {
    return <div className="h-screen bg-tblue text-white">Loading</div>;
  }

  return user ? <Navigate to={url} /> : <>{children}</>;
};

export default RedirectRoute;
