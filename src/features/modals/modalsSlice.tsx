import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { routes } from '../../app/routes'

const token = 'Bearer ' + localStorage.getItem('auth_token')

export const onInit = createAsyncThunk(
  'init',
  async () => {   
    const reqConfig = () => {
      return {
          method: 'get',
          url: routes.getUsers(),
          headers: { Authorization: token },
          timeout: 10000,
      }
    }

    const {data} = await axios(reqConfig())
    return data
  }
)

export const onCreate = createAsyncThunk(
  'create',
  async ({ operation, ids: { boardId, columnId }, data } 
    : { operation: string, ids: { boardId: string, columnId: string, taskId: string, userId: string }, data: object }) => {
    
    const getUrl = () => {
      switch (operation) {
        case ('create-board'):
          return routes.createBoard()
        case ('create-column'): 
          return routes.createColumn({ boardId })
        case ('create-task'):
          return routes.createTask({ boardId, columnId })
        default:
          throw Error(`Enknown operation key: ${operation}`)
      }
    }

    const reqConfig = () => {
      return {
          method: 'post',
          url: getUrl(),
          headers: { Authorization: token },
          data,
          timeout: 10000,
      }
    }
    
    const res = await axios(reqConfig())
    return res
  }
)
export const loadItem = createAsyncThunk(
  'loadItem',
  async ({ operation, ids: { boardId, columnId, taskId } } 
    : { operation: string, ids: { boardId: string, columnId: string, taskId: string, userId: string }}) => {

    const getUrl = () => {
      switch (operation) {
        case ('update-board'):
          return routes.getBoardById(boardId)
        case ('update-column'): 
          return routes.getColumnByIds({ boardId, columnId })
        case ('update-task'):
          return routes.getTaskByIds({ boardId, columnId, taskId })
        default:
          throw Error(`Enknown operation key: ${operation}`)
      }
    }

    const reqConfig = () => {
      return {
          method: 'get',
          url: getUrl(),
          headers: { Authorization: token },
          timeout: 10000,
      }
    }

    const { data } = await axios(reqConfig())

    return data
  }
)

export const onUpdate = createAsyncThunk(
  'update',
  async ({ operation, ids: { boardId, columnId, userId, taskId }, data } 
    : { operation: string, ids: { boardId: string, columnId: string, taskId: string, userId: string }, data: object}) => {
    
    const getUrl = () => {
      switch (operation) {
        case ('update-board'):
          return routes.getBoardById(boardId)
        case ('update-column'): 
          return routes.getColumnByIds({ boardId, columnId })
        case ('update-task'):
          return routes.getTaskByIds({ boardId, columnId, taskId })
        default:
          throw Error(`Enknown operation key: ${operation}`)
      }
    }

    const reqConfig = () => {
      return {
          method: 'put',
          url: getUrl(),
          headers: { Authorization: token },
          data,
          timeout: 10000,
      }
    }
  
    await axios(reqConfig())
  }
)

export const onDelete = createAsyncThunk(
  'delete',
  async ({ operation, ids: { boardId, columnId, taskId, userId } } 
    : { operation: string, ids: { boardId: string, columnId: string, taskId: string, userId: string }}) => {
    
    const getUrl = () => {
      switch (operation) {
        case ('delete-board'):
          return routes.getBoardById(boardId)
        case ('delete-column'): 
          return routes.getColumnByIds({ boardId, columnId })
        case ('delete-task'):
          return routes.getTaskByIds({ boardId, columnId, taskId })
        case ('delete-user'):
          return routes.deleteUserPath({ userId })
        default:
          throw Error(`Enknown operation key: ${operation}`)
      }
    }

    const deleteReqConfig = () => {
      return {
          method: 'delete',
          url: getUrl(),
          headers: { Authorization: token },
          timeout: 10000,
      }
    }
  
    await axios(deleteReqConfig())
  }
)

const idleIds = { boardId: 'idle', columnId: 'idle', taskId: 'idle', userId: 'idle' }

const modalFromsSlice = createSlice({
    name: 'modal',
    initialState: {
      users: { status: 'idle', partisipants: [] as any},
      item: { status: 'idle', data: [] as any},
      status: 'idle',
      modalType: 'unset',
      info: { operation: 'idle', ids: idleIds },
      err: null as unknown,
      errTitle: false,
      errDesc: false,
    },
    reducers: {
      openModal: (state, action) => {
        const { type, info } = action.payload
        state.modalType = type
        state.info = info
      },
      closeModal: (state) => {
        state.modalType = 'unset'
        state.info = { operation: 'idle', ids: idleIds }
      },
      logout: (state) => {
        localStorage.removeItem('auth_token');
        localStorage.removeItem('auth_token_exp_date');
        localStorage.removeItem('user');
        state.modalType = 'unset'
        state.users.status = 'idle'
        state.info = { operation: 'idle', ids: idleIds }
      },
      setErrTitle (state) { state.errTitle = true },
      noErrTitle (state) { state.errTitle = false },
      setIdle: (state) => { state.item.status = 'idle' }, 
      setErrDesc (state) { state.errDesc = true },
      noErrDesc (state) { state.errDesc = false }
    },
    extraReducers: (builder) => {
      builder
        .addCase(onInit.pending || loadItem.pending || onDelete.pending || onCreate.pending, (state) => {
          state.status = 'wait'
        })
        .addCase(onInit.fulfilled || onDelete.fulfilled || onCreate.fulfilled, (state, action) => {
          state.users.status = "loaded"
          state.users.partisipants = action.payload
          state.status = 'idle'
          state.modalType = 'unset'
          state.info = { operation: 'idle', ids: idleIds }
        })
        .addCase(loadItem.fulfilled, (state, action) => {
          state.item.status = 'loaded'
          state.item.data = action.payload
        })
        .addCase(onInit.rejected || loadItem.rejected || onDelete.rejected || onCreate.rejected, (state, action) => {
          state.status = 'failed'
          console.log(action.payload)
          state.err = action.payload
          state.modalType = 'unset'
          state.item.status = 'idle'
          state.info = { operation: 'idle', ids: idleIds }
        });
    },
  });
  
  export const {
    openModal,
    closeModal,
    logout,
    setErrTitle,
    noErrTitle,
    setIdle,
    setErrDesc,
    noErrDesc
  } = modalFromsSlice.actions
  
  export default modalFromsSlice.reducer