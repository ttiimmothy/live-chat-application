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
  setTimeout(() => {
    window.close();
  }, 1000);
};

export const signOut = () => {
  auth.signOut();
};

onAuthStateChanged(auth, async (result) => {
  if (result) {
    const docRef = doc(db, "users", result.email || "");
    try {
      await updateDoc(docRef, { updatedAt: serverTimestamp() });
    } catch (error) {
      console.error(error);
      try {
        await setDoc(docRef, {
          name: result.displayName,
          email: result.email,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        });
      } catch (error) {
        console.error("Error setting the document:", error);
      }
    }
  }
});
