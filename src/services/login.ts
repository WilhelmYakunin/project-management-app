import axios from 'axios';
import { parseJwt } from '../utils';

interface LoginData {
  login: string;
  password: string;
}

export const login = async (loginData: LoginData, onError: (e: unknown) => void = () => {}) => {
  return await axios.post('/auth/signin', JSON.stringify(loginData)).then((resp) => {
    const { token } = resp.data;
    const { id, exp } = parseJwt(token);
    localStorage.setItem('auth_token', token);
    localStorage.setItem('auth_token_exp_date', exp);
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    return id;
  });
};
