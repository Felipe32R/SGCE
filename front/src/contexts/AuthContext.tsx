import { Dispatch, createContext, useCallback, useState } from "react";
import { localStorageKeys } from "../config/localStorageKeys";
import { User } from "../app/services/authService";

interface AuthContextValue {
  signedIn: boolean;
  signin: (token: string, user: User) => void;
  signout: () => void;
  user: User | null;
  setUser: Dispatch<React.SetStateAction<User | null>>;
}

export const AuthContext = createContext({} as AuthContextValue);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [signedIn, setSignedIn] = useState<boolean>(() => {
    const storedAccessToken = localStorage.getItem(
      localStorageKeys.ACCESS_TOKEN
    );

    return !!storedAccessToken;
  });

  const [user, setUser] = useState<User | null>(() => {
    const user = localStorage.getItem(localStorageKeys.USER);
    if (user) {
      return JSON.parse(user);
    }
  });

  const signin = useCallback((token: string, user: User) => {
    localStorage.setItem(localStorageKeys.ACCESS_TOKEN, token);
    localStorage.setItem(localStorageKeys.USER, JSON.stringify(user));
    setUser(user);
    setSignedIn(true);
  }, []);

  const signout = useCallback(() => {
    localStorage.removeItem(localStorageKeys.ACCESS_TOKEN);

    setSignedIn(false);
  }, []);

  return (
    <AuthContext.Provider value={{ signedIn, signin, signout, user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}
