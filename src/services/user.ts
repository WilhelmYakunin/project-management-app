import axios from 'axios';

export interface UserData {
  name: string;
  login: string;
  password: string;
}

export const getUserById = async (id: string) => {
  return await axios.get(`/users/${id}`).then((resp) => resp.data);
};

export const addUser = async (user: UserData) => {
  return await axios.post('/auth/signup', JSON.stringify(user)).then((resp) => resp.data);
};
