import { useAuthState } from "react-firebase-hooks/auth";
import { googleSignIn, signOut } from "../../utils/auth";
import { auth } from "../../../firebase.config";

const Navbar: React.FC = () => {
  const [user] = useAuthState(auth);

  return (
    <nav className="flex justify-center border-b-2">
      <div className="w-full h-12 flex justify-between items-center max-w-5xl mx-auto">
        <a className="text-xl font-semibold" href="/">
          Live Chat
        </a>
        {user ? (
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
