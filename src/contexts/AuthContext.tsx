import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import {
  User,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  GithubAuthProvider,
} from "firebase/auth";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import { auth, db, googleProvider, githubProvider } from "../lib/firebase";
import { toast } from "sonner";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signUpWithEmail: (email: string, password: string, name: string) => Promise<void>;
  signInWithEmail: (email: string, password: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signInWithGithub: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Save user to database
  const saveUserToDatabase = async (user: User, additionalData?: { name?: string; provider?: string }) => {
    try {
      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
        // User doesn't exist, create new user document
        await setDoc(userRef, {
          uid: user.uid,
          email: user.email,
          name: additionalData?.name || user.displayName || "User",
          photoURL: user.photoURL || null,
          provider: additionalData?.provider || "email",
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        });
      } else {
        // User exists, update last login
        await setDoc(
          userRef,
          {
            updatedAt: serverTimestamp(),
            lastLoginAt: serverTimestamp(),
          },
          { merge: true }
        );
      }
    } catch (error) {
      console.error("Error saving user to database:", error);
      throw error;
    }
  };

  // Sign up with email and password
  const signUpWithEmail = async (email: string, password: string, name: string) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Update user profile with name
      if (user) {
        await saveUserToDatabase(user, { name, provider: "email" });
        toast.success("Account created successfully!");
      }
    } catch (error: any) {
      console.error("Error signing up:", error);
      const errorMessage = error.message || "Failed to create account";
      toast.error(errorMessage);
      throw error;
    }
  };

  // Sign in with email and password
  const signInWithEmail = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Signed in successfully!");
    } catch (error: any) {
      console.error("Error signing in:", error);
      const errorMessage = error.message || "Failed to sign in";
      toast.error(errorMessage);
      throw error;
    }
  };

  // Sign in with Google
  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      await saveUserToDatabase(user, { provider: "google" });
      toast.success("Signed in with Google successfully!");
    } catch (error: any) {
      console.error("Error signing in with Google:", error);
      const errorMessage = error.message || "Failed to sign in with Google";
      toast.error(errorMessage);
      throw error;
    }
  };

  // Sign in with GitHub
  const signInWithGithub = async () => {
    try {
      const result = await signInWithPopup(auth, githubProvider);
      const user = result.user;
      await saveUserToDatabase(user, { provider: "github" });
      toast.success("Signed in with GitHub successfully!");
    } catch (error: any) {
      console.error("Error signing in with GitHub:", error);
      const errorMessage = error.message || "Failed to sign in with GitHub";
      toast.error(errorMessage);
      throw error;
    }
  };

  // Logout
  const logout = async () => {
    try {
      await signOut(auth);
      toast.success("Signed out successfully!");
    } catch (error: any) {
      console.error("Error signing out:", error);
      toast.error("Failed to sign out");
      throw error;
    }
  };

  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const value = {
    user,
    loading,
    signUpWithEmail,
    signInWithEmail,
    signInWithGoogle,
    signInWithGithub,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

