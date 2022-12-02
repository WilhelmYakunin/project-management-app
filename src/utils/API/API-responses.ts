import { IBoardData } from '../../features/boards-item/interfaces';
const baseUrl = 'https://project-management-app-production-b64f.up.railway.app';
const boards = `${baseUrl}/boards`;

export async function getBoardsList() {
  const response = await fetch(boards, {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `${localStorage.getItem('token')}`,
    },
  });

  return response;
}

export async function pushNewBoardToList(body: IBoardData) {
  const response = await fetch(boards, {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `${localStorage.getItem('token')}`,
    },
    body: JSON.stringify(body),
  });

  return response;
}

export async function editBoardById(id: string, body: IBoardData) {
  const response = await fetch(`${boards}/${id}`, {
    method: 'PUT',
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `${localStorage.getItem('token')}`,
    },
    body: JSON.stringify(body),
  });

  return response;
}

export async function deleteBoardById(id: string) {
  const response = await fetch(`${boards}/${id}`, {
    method: 'DELETE',
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `${localStorage.getItem('token')}`,
    },
  });

  return response;
}
