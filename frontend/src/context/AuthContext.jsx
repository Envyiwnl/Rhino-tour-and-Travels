import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";

import { auth } from "../firebase/firebase";

export const AuthContext = createContext(null);

const googleProvider = new GoogleAuthProvider();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  const syncUserWithBackend = useCallback(
    async (firebaseUser, forceRefresh = false) => {
      if (!firebaseUser) return;

      try {
        const token = await firebaseUser.getIdToken(forceRefresh);

        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/users/sync`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        if (!response.ok) {
          const data = await response.json().catch(() => ({}));

          throw new Error(data.message || "Unable to sync user.");
        }

        return await response.json();
      } catch (error) {
        console.error("User sync failed:", error);
        return null;
      }
    },
    [],
  );

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setAuthLoading(false);

      if (currentUser) {
        syncUserWithBackend(currentUser);
      }
    });

    return unsubscribe;
  }, [syncUserWithBackend]);

  const signup = useCallback(
    async (name, email, password) => {
      const credential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );

      await updateProfile(credential.user, {
        displayName: name,
      });

      await syncUserWithBackend(credential.user, true);

      return credential.user;
    },
    [syncUserWithBackend],
  );

  const login = useCallback(async (email, password) => {
    const credential = await signInWithEmailAndPassword(auth, email, password);

    return credential.user;
  }, []);

  const loginWithGoogle = useCallback(async () => {
    const credential = await signInWithPopup(auth, googleProvider);

    return credential.user;
  }, []);

  const logout = useCallback(() => {
    return signOut(auth);
  }, []);

  const resetPassword = useCallback((email) => {
    return sendPasswordResetEmail(auth, email);
  }, []);

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: !!user,
      authLoading,
      signup,
      login,
      loginWithGoogle,
      logout,
      resetPassword,
    }),
    [user, authLoading, signup, login, loginWithGoogle, logout, resetPassword],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
