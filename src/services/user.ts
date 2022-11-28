import { User } from '../models';
import { BASE_URL } from './';
import { AuthHeader } from './login';

export interface UserData {
  name: string;
  login: string;
  password: string;
}

export const getUserById = async (id: string): Promise<User> => {
  return await fetch(`${BASE_URL}/users/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...AuthHeader(),
    },
  }).then((resp) => resp.json());
};

export const addUser = async (user: UserData): Promise<User> => {
  return await fetch(`${BASE_URL}/auth/signup`, {
    method: 'POST',
    body: JSON.stringify(user),
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((resp) => resp.json());
};
