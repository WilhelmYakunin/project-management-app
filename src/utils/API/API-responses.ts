import { IBoardData } from '../../features/boards-item/interfaces';
import { IColumnData } from '../../features/columns-item/interfaces';
import { ITaskData } from '../../features/tasks-item/interfaces';
const baseUrl = 'https://project-management-app-production-b64f.up.railway.app';
const boards = `${baseUrl}/boards`;
const token = localStorage.getItem('token') ?? '';

export async function getBoardsList() {
  const response = await fetch(boards, {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: token,
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
      Authorization: token,
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
      Authorization: token,
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
      Authorization: token,
    },
  });

  return response;
}

export async function getColumnsListByBoardId(boardId: string) {
  const response = await fetch(`${boards}/${boardId}/columns`, {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: token,
    },
  });

  return response;
}

export async function getTasksInColumn(boardId: string, columnId: string) {
  const response = await fetch(`${boards}/${boardId}/columns/${columnId}/tasks`, {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: token,
    },
  });

  return response;
}

interface ICreateColumnBody {
  title: string;
  order: number;
}

export async function createColumnInBoard(body: ICreateColumnBody, boardId: string) {
  const response = await fetch(`${boards}/${boardId}/columns`, {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: token,
    },
    body: JSON.stringify(body),
  });

  return response;
}

export async function deleteColumn(columnData: IColumnData) {
  const response = await fetch(`${boards}/${columnData.boardId}/columns/${columnData._id}`, {
    method: 'DELETE',
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: token,
    },
  });

  return response;
}

export async function editColumn(columnData: IColumnData, body: ICreateColumnBody) {
  const response = await fetch(`${boards}/${columnData.boardId}/columns/${columnData._id}`, {
    method: 'PUT',
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: token,
    },
    body: JSON.stringify(body),
  });

  return response;
}

export async function createTaskInColumn(
  body: ICreateColumnBody,
  boardId: string,
  columnId: string
) {
  const response = await fetch(`${boards}/${boardId}/columns/${columnId}/tasks`, {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: token,
    },
    body: JSON.stringify(body),
  });

  return response;
}

export async function deleteTask(taskData: ITaskData) {
  const response = await fetch(
    `${boards}/${taskData.boardId}/columns/${taskData.columnId}/tasks/${taskData._id}`,
    {
      method: 'DELETE',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: token,
      },
    }
  );

  return response;
}

export async function editTask(taskData: ITaskData, body: ICreateColumnBody) {
  const response = await fetch(
    `${boards}/${taskData.boardId}/columns/${taskData.columnId}/tasks/${taskData._id}`,
    {
      method: 'PUT',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: token,
      },
      body: JSON.stringify(body),
    }
  );

  return response;
}
