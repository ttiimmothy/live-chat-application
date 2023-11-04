import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
} from "firebase/auth";
import { auth, db } from "../../../firebase.config";
import { doc, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";

export const googleSignIn = async () => {
  const provider = new GoogleAuthProvider();
  await signInWithPopup(auth, provider);
};

export const signOut = () => {
  auth.signOut();
};

onAuthStateChanged(auth, async (result) => {
  // CreateUserProfile
  if (result) {
    const docRef = doc(db, "users", result.email || "");
    try {
      await updateDoc(docRef, {});
    } catch (error) {
      // If the document doesn't exist, catch the error and set the document
      try {
        await setDoc(docRef, {
          name: result.displayName,
          email: result.email,
          createdAt: serverTimestamp(),
        });
      } catch (error) {
        console.error("Error setting the document:", error);
      }
    }
  }
});
