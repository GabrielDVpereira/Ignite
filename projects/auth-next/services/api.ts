import axios from 'axios'; 
import { parseCookies,setCookie } from 'nookies'; 

export const api = axios.create({
  baseURL: 'http://localhost:3333', 
});


api.interceptors.request.use(async (config) => {
  const cookies = parseCookies(); 
  let token = cookies['nextauth.token']; 
  config.headers.authorization =  `Bearer ${token}`
  return config
}, (err) => {
  console.log(err)
}); 


const getNewToken = async (refreshToken: string): Promise<AuthTokens> => {
  const { data } = await api.post('/refresh', { refreshToken })
    const { token: newToken, refreshToken: newRefreshToken } = data; 
    return { token: newToken, refreshToken: newRefreshToken };
}

interface AuthTokens {
  token: string; 
  refreshToken: string; 
}

const saveTokensInCookies = ({ token, refreshToken }:AuthTokens ) => {
  return new Promise((resolve) => {
    setCookie(undefined, 'nextauth.token', token, {
      maxAge: 60 * 60 * 24 * 30, // 1 month
      path: '/' // paths that can access the cookie
    }); 
    setCookie(undefined, 'nextauth.refreshToken', refreshToken, {
      maxAge: 60 * 60 * 24 * 30, // 1 month
      path: '/' // paths that can access the cookie
    }); 
  })  
}