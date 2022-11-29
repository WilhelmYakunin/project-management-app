import { BASE_URL } from './';
import { getUserById } from './user';

let AUTH_TOKEN: null | string = null;

interface LoginData {
  login: string;
  password: string;
}

const parseJwt = (token: string): { id: string; login: string } => {
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  var jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split('')
      .map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join('')
  );

  return JSON.parse(jsonPayload);
};

export const login = async (user: LoginData, onError: (e: unknown) => void = () => {}) => {
  return await fetch(`${BASE_URL}/auth/signin`, {
    method: 'POST',
    body: JSON.stringify(user),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((resp) => resp.json())
    .then(async ({ token }) => {
      const { id } = parseJwt(token);
      AUTH_TOKEN = token;
      return await getUserById(id);
    });
};

export const AuthHeader = () => ({
  authorization: `Bearer ${AUTH_TOKEN}`,
});
