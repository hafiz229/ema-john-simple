import { useState } from "react";
import {
  getAuth,
  signInWithPopup,
  signOut,
  GoogleAuthProvider,
  onAuthStateChanged,
} from "firebase/auth";
import { useEffect } from "react";
import initializeAuthentication from "../Firebase/firebase.init";

initializeAuthentication();

const useFirebase = () => {
  const [user, setUser] = useState({});

  const auth = getAuth();
  const googleProvider = new GoogleAuthProvider();

  const singInUsingGoogle = () => {
    // avoid then here to redirect latest page after login
    return signInWithPopup(auth, googleProvider);
  };

  const logOut = () => {
    signOut(auth).then(() => {
      setUser({});
    });
  };

  // observ whether user auth state changed or not
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      }
    });
    return unsubscribe;
  }, []);

  return { user, singInUsingGoogle, logOut };
};

export default useFirebase;
