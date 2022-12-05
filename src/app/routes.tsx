const server = 'https://project-management-app-production-b64f.up.railway.app'

export const routes = {
    getUsers: () => [server, 'users'].join('/'),
    getBoardById: (boardId: string) => [server, 'boards', boardId].join('/'),
    getColumnByIds: ({ boardId, columnId } : {boardId: string, columnId: string}) => 
        [server, 'boards', boardId, 'columns', columnId].join('/'),
    getTaskByIds: ({ boardId, columnId, taskId } : {boardId: string, columnId: string, taskId: string}) => 
        [server, 'boards', boardId, 'columns', columnId, 'tasks', taskId].join('/'),
    createBoard: () => [server, 'boards'].join('/'),
    createColumn: ({ boardId } : {boardId: string}) => 
            [server, 'boards', boardId, 'columns'].join('/'),
    createTask: ({ boardId, columnId } : {boardId: string, columnId: string}) => 
            [server, 'boards', boardId, 'columns', columnId, 'tasks'].join('/'),
    deleteUserPath: ({ userId } : { userId: string}) =>  [server, 'users', userId].join('/'),
}