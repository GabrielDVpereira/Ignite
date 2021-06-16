import { createContext, ReactNode, useCallback, useContext } from "react";

type SignInCredentials = {
  email: string; 
  password: string; 
}

type AuthContextData = {
  signIn(credentials:SignInCredentials): Promise<void>
  isAuthenticated: boolean; 
}

export const AuthContext = createContext({} as AuthContextData); 

interface AuthProviderProps {
  children: ReactNode 
}

export function AuthProvider({ children } : AuthProviderProps){
  const signIn =useCallback(async (credentials) => {
    console.log(credentials)
  }, [])
  return <AuthContext.Provider value={{isAuthenticated: false,signIn }}>
    {children}
  </AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext); 