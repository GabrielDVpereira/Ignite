import axios from 'axios'; 
import { parseCookies,setCookie } from 'nookies'; 
import jwt, { JwtPayload } from 'jsonwebtoken'; 


export const api = axios.create({
  baseURL: 'http://localhost:3333', 
});

const whiteList = ['/refresh']

api.interceptors.request.use(async (config) => {
  const cookies = parseCookies(); 
  let token = cookies['nextauth.token']; 
  console.log(config.url, token)

  if(token && !whiteList.includes(String(config.url))){
    const payload = jwt.decode(token) as JwtPayload; 
    const tokenExpirationTime = payload.exp as number; 
    const now = Date.now() / 1000;
    if(now > tokenExpirationTime){
      const refreshToken = cookies['nextauth.refreshToken']; 
      token = await getNewToken(refreshToken); 
    }
  }
  config.headers.authorization =  `Bearer ${token}`
  return config
}, (err) => {
  console.log(err)
}); 


const getNewToken = async (refreshToken: string): Promise<string> => {
  const { data } = await api.post('/refresh', { refreshToken })
    const { token: newToken, refreshToken: newRefreshToken } = data; 
    saveTokensInCookies({ token:newToken , refreshToken: newRefreshToken  }); 
    return newToken;
}

interface AuthTokens {
  token: string; 
  refreshToken: string; 
}

const saveTokensInCookies = ({ token, refreshToken }:AuthTokens ) => {
  setCookie(undefined, 'nextauth.token', token, {
    maxAge: 60 * 60 * 24 * 30, // 1 month
    path: '/' // paths that can access the cookie
  }); 
  setCookie(undefined, 'nextauth.refreshToken', refreshToken, {
    maxAge: 60 * 60 * 24 * 30, // 1 month
    path: '/' // paths that can access the cookie
  }); 
}