import axios from 'axios';

export interface UserData {
  name: string;
  login: string;
  password: string;
  userId?: string;
}

const token = 'Bearer ' + localStorage.getItem('auth_token');

export const getUserById = async (id: string) => {
  return await axios.get(`/users/${id}`).then((resp) => resp.data);
};

export const addUser = async (user: UserData) => {
  return await axios.post('/auth/signup', JSON.stringify(user)).then((resp) => resp.data);
};

export const changeUserData = async (user: any) => {
  const { name, login, password, userId } = user;
  const changeuserpath = '/users/' + userId.id;
  return await axios({
    method: 'PUT',
    url: changeuserpath,
    headers: { Authorization: token },
    data: { name, login, password },
  }).then((resp) => resp.data);
};
