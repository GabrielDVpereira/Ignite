import { createContext, ReactNode, useCallback, useContext, useState } from "react";
import { setCookie } from 'nookies'
import { api } from "../services/api";
import Router from 'next/router'; 

type SignInCredentials = {
  email: string; 
  password: string; 
}

type AuthContextData = {
  user: User
  signIn(credentials:SignInCredentials): Promise<void>
  isAuthenticated: boolean; 
}

type User = {
  email: string; 
  permissions: string[]; 
  roles: string[]
}

export const AuthContext = createContext({} as AuthContextData); 

interface AuthProviderProps {
  children: ReactNode 
}

export function AuthProvider({ children } : AuthProviderProps) {
  const [user, setUser ] = useState<User>({} as User ); 

  const signIn = useCallback(async (credentials: SignInCredentials ) => {
    try {
      const response = await api.post('/sessions', credentials); 
      const { permissions, roles, token, refreshToken } = response.data; 
      const { email } = credentials; 

      setCookie(undefined, 'nextauth.token', token, {
        maxAge: 60 * 60 * 24 * 30, // 1 month
        path: '/' // paths that can access the cookie
      }); 
      setCookie(undefined, 'nextauth.refreshToken', refreshToken, {
        maxAge: 60 * 60 * 24 * 30, // 1 month
        path: '/' // paths that can access the cookie
      }); 

      setUser({email,permissions, roles }); 
      Router.push('/dashboard');

    }catch(err){
      console.log(err); 
    }

  }, []); 

  return <AuthContext.Provider value={{isAuthenticated: !!user , signIn, user }}>
    {children}
  </AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext); 