import { useAuthState } from "react-firebase-hooks/auth";
import { googleSignIn, signOut } from "../utils/auth";
import { auth } from "../../../firebase.config";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const Navbar: React.FC = () => {
  const [user] = useAuthState(auth);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 400);
  }, []);

  return (
    <nav className="flex justify-center border-b-2">
      <div className="w-full h-12 flex justify-between items-center max-w-5xl mx-auto px-8">
        <Link
          className="text-xl font-semibold text-gray-600 hover:text-gray-300"
          to="/"
        >
          Chat rooms
        </Link>
        {isLoading ? (
          <div className="text-gray-300">Loading</div>
        ) : user ? (
          <button onClick={signOut} className="sign-out" type="button">
            Sign Out
          </button>
        ) : (
          <button
            className="sign-in"
            onClick={() => googleSignIn()}
            type="button"
          >
            Login
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
