import { signInWithGoogle } from "../firebase";
import { useNavigate } from "react-router-dom";

const AuthPage = () => {
  const navigate = useNavigate();

  const handleLogin = async () => {
    const user = await signInWithGoogle();
    if (user) {
      console.log("User signed in:", user);
      navigate("/profile");
    } else {
      console.error("User sign-in failed");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
      <h1 className="text-4xl font-bold">Sign In</h1>
      <button
        onClick={handleLogin}
        className="mt-6 px-6 py-3 bg-blue-500 rounded-lg hover:bg-blue-600 transition"
      >
        Sign in with Google
      </button>
    </div>
  );
};

export default AuthPage;
