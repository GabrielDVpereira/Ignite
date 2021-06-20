import axios from 'axios';
import { parseCookies, setCookie } from 'nookies';

export const api = axios.create({
  baseURL: 'http://localhost:3333',
});


api.interceptors.request.use(async (config) => {
  const cookies = parseCookies();
  let token = cookies['nextauth.token'];
  config.headers.authorization = `Bearer ${token}`
  return config
}, (err) => {
  console.log(err)
});



api.interceptors.response.use(response => {
  return response;
}, error => {
  const { config, response: { status } } = error;
  const originalRequest = config;

  if (status === 401) {
    // this lets only one failed request ask for a new token
    if (!isRefreshingToken) {
      isRefreshingToken = true;
      getNewTokens().then(({ token, refreshToken }) => {
        isRefreshingToken = false;
        saveTokensInCookies({ token, refreshToken });
        onRrefreshed(token)
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
    return Promise.reject(error);
  }
});

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


const getNewTokens = async (): Promise<AuthTokens> => {
  const cookies = parseCookies();
  const refreshToken = cookies['nextauth.refreshToken']
  const { data } = await api.post('/refresh', { refreshToken })
  const { token: newToken, refreshToken: newRefreshToken } = data;
  return { token: newToken, refreshToken: newRefreshToken };
}

interface AuthTokens {
  token: string;
  refreshToken: string;
}

const saveTokensInCookies = ({ token, refreshToken }: AuthTokens) => {
  setCookie(undefined, 'nextauth.token', token, {
    maxAge: 60 * 60 * 24 * 30, // 1 month
    path: '/' // paths that can access the cookie
  });
  setCookie(undefined, 'nextauth.refreshToken', refreshToken, {
    maxAge: 60 * 60 * 24 * 30, // 1 month
    path: '/' // paths that can access the cookie
  });
}