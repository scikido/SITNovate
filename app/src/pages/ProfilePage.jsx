import { auth, db, doc, getDoc, setDoc, updateDoc } from "../firebase";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiEdit } from "react-icons/fi";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState({
    name: "",
    title: "",
    topics: "",
    bio: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  // Fetch user & profile info
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
      if (!currentUser) return navigate("/auth");
      setUser(currentUser);
      
      const userRef = doc(db, "users", currentUser.uid);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        setProfile(userSnap.data());
      } else {
        // Initialize profile in Firestore if not found
        await setDoc(userRef, {
          name: currentUser.displayName || "",
          title: "",
          topics: "",
          bio: "",
        });
      }
    });

    return unsubscribe;
  }, [navigate]);

  // Update Firestore when user edits profile
  const handleUpdate = async (field, value) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
    if (user) {
      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, { [field]: value });
    }
  };

  return user ? (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-6">
      {/* Profile Picture */}
      <img src={user.photoURL} className="w-20 h-20 rounded-full shadow-md" alt="Profile" />
      
      {/* Editable Fields */}
      <div className="mt-4 w-full max-w-md bg-gray-800 p-6 rounded-lg shadow-lg">
        {/* Name */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl">{profile.name}</h1>
          <FiEdit className="cursor-pointer text-gray-400 hover:text-white" onClick={() => setIsEditing("name")} />
        </div>
        {isEditing === "name" && (
          <input
            type="text"
            value={profile.name}
            onChange={(e) => handleUpdate("name", e.target.value)}
            onBlur={() => setIsEditing(false)}
            className="w-full mt-2 p-2 bg-gray-700 rounded-md"
          />
        )}

        {/* Title */}
        <div className="flex justify-between items-center mt-4">
          <h2 className="text-lg text-gray-300">{profile.title || "No Title Set"}</h2>
          <FiEdit className="cursor-pointer text-gray-400 hover:text-white" onClick={() => setIsEditing("title")} />
        </div>
        {isEditing === "title" && (
          <input
            type="text"
            value={profile.title}
            onChange={(e) => handleUpdate("title", e.target.value)}
            onBlur={() => setIsEditing(false)}
            className="w-full mt-2 p-2 bg-gray-700 rounded-md"
          />
        )}

        {/* Interested Topics */}
        <div className="flex justify-between items-center mt-4">
          <h3 className="text-md text-gray-400">{profile.topics || "No Topics Set"}</h3>
          <FiEdit className="cursor-pointer text-gray-400 hover:text-white" onClick={() => setIsEditing("topics")} />
        </div>
        {isEditing === "topics" && (
          <input
            type="text"
            value={profile.topics}
            onChange={(e) => handleUpdate("topics", e.target.value)}
            onBlur={() => setIsEditing(false)}
            className="w-full mt-2 p-2 bg-gray-700 rounded-md"
          />
        )}

        {/* Bio */}
        <div className="flex justify-between items-center mt-4">
          <p className="text-gray-400">{profile.bio || "No Bio Set"}</p>
          <FiEdit className="cursor-pointer text-gray-400 hover:text-white" onClick={() => setIsEditing("bio")} />
        </div>
        {isEditing === "bio" && (
          <textarea
            value={profile.bio}
            onChange={(e) => handleUpdate("bio", e.target.value)}
            onBlur={() => setIsEditing(false)}
            className="w-full mt-2 p-2 bg-gray-700 rounded-md"
          />
        )}

        {/* Logout Button */}
        <button
          className="mt-6 w-full bg-red-500 hover:bg-red-600 p-2 rounded-md"
          onClick={() => auth.signOut().then(() => navigate("/auth"))}
        >
          Logout
        </button>
      </div>
    </div>
  ) : null;
};

export default ProfilePage;
