import axios, { AxiosInstance } from 'axios';
import { GetServerSidePropsContext } from 'next';
import { parseCookies, setCookie } from 'nookies';
import { logOut } from '../context/AuthContext';

export const setUpHttp = (ctx?: GetServerSidePropsContext): AxiosInstance => {
  const api = axios.create({
    baseURL: 'http://localhost:3333',
  });


  api.interceptors.request.use(async (config) => {
    const cookies = parseCookies(ctx);
    let token = cookies['nextauth.token'];
    if (token) {
      config.headers.authorization = `Bearer ${token}`
    }
    return config
  }, (err) => {
    console.log(err)
  });



  api.interceptors.response.use(response => {
    return response;
  }, error => {
    const { config, response: { status, data } } = error;
    const originalRequest = config;

    if (status === 401 && data.code === 'token.expired') {
      // this lets only one failed request ask for a new token
      if (!isRefreshingToken) {
        isRefreshingToken = true;
        getNewTokens(api, ctx)
          .then(({ token, refreshToken }) => {
            isRefreshingToken = false;
            saveTokensInCookies({ token, refreshToken }, ctx);
            onRrefreshed(token)
          }).catch(() => {
            if (process.browser) {
              logOut()
            }
            return Promise.reject(error);
          })
      }

      const retryOrigReq = new Promise((resolve) => {
        subscribeTokenRefresh((token: string) => {
          originalRequest.headers.authorization = `Bearer ${token}`;
          resolve(axios(originalRequest));
        });
      });

      return retryOrigReq;

    } else {
      if (process.browser) {
        logOut()
      }
      return Promise.reject(error);
    }
  });

  return api;
}

type requestCallback = (token: string) => void;

let isRefreshingToken = false;
let refreshSubscribers: requestCallback[] = [];

// creating a queue of failed requests to retry once the token is refreshed
function subscribeTokenRefresh(cb: requestCallback) {
  refreshSubscribers.push(cb);
}

// executing the queue with the new token
function onRrefreshed(token: string) {
  refreshSubscribers.map(cb => cb(token));
  refreshSubscribers = []
}


const getNewTokens = async (api: AxiosInstance, ctx?: GetServerSidePropsContext): Promise<AuthTokens> => {
  const cookies = parseCookies(ctx);
  const refreshToken = cookies['nextauth.refreshToken']
  const { data } = await api.post('/refresh', { refreshToken });
  const { token: newToken, refreshToken: newRefreshToken } = data;
  return { token: newToken, refreshToken: newRefreshToken };

}

interface AuthTokens {
  token: string;
  refreshToken: string;
}

const saveTokensInCookies = ({ token, refreshToken }: AuthTokens, ctx?: GetServerSidePropsContext) => {
  setCookie(ctx, 'nextauth.token', token, {
    maxAge: 60 * 60 * 24 * 30, // 1 month
    path: '/' // paths that can access the cookie
  });
  setCookie(ctx, 'nextauth.refreshToken', refreshToken, {
    maxAge: 60 * 60 * 24 * 30, // 1 month
    path: '/' // paths that can access the cookie
  });
}