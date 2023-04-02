import { BaseThunkType, InferActionTypes } from '../../../01_Base'
import { todolistsApi, TodolistType } from '../../../todolists.api'
import { actions as appActions, RequestStatusType } from '../../../app/appReducer'
import { handleNetworkError } from '../../../utils/handleError'
import { handleServerError } from './../../../utils/handleError'
import { AxiosError } from 'axios'

type ThunkType = BaseThunkType<ActionType>
type InitialStateType = typeof initialState
type ActionType = InferActionTypes<typeof actions> | ReturnType<typeof appActions.setStatus>

export type FilterValuesType = 'all' | 'active' | 'completed'
export type TodoListDomainType = TodolistType & {
  filter: FilterValuesType
  entityStatus: RequestStatusType
}

const initialState: TodoListDomainType[] = []
export const todoListsReducer = (state: InitialStateType = initialState, action: ActionType): TodoListDomainType[] => {
  switch (action.type) {
    case 'TODOLISTS/SET-FILTER':
      return state.map((t) => (t.id === action.payload.todolistId ? { ...t, filter: action.payload.filter } : t))
    case 'TODOLISTS/SET-STATUS':
      return state.map((t) => (t.id === action.payload.todolistId ? { ...t, entityStatus: action.payload.status } : t))
    case 'TODOLISTS/SET-TITLE':
      return state.map((t) => (t.id === action.payload.todolistId ? { ...t, title: action.payload.title } : t))
    case 'TODOLISTS/TASKS/REMOVE-TODOLIST':
      return state.filter((t) => t.id !== action.payload.todolistId)
    case 'TODOLISTS/SET-TODOLISTS':
      return action.payload.todolists.map((t) => ({ ...t, filter: 'all', entityStatus: 'idle' }))
    case 'TODOLISTS&TASKS/CREATE-TODOLIST&TASKS':
      return [{ ...action.payload.todolist, filter: 'all', entityStatus: 'idle' }, ...state]

    default:
      return state
  }
}
export const actions = {
  addNewTodoList: (todolist: TodolistType) =>
    ({
      type: 'TODOLISTS&TASKS/CREATE-TODOLIST&TASKS',
      payload: { todolist, todolistId: todolist.id },
    } as const),
  removeTodoList: (todolistId: string) =>
    ({
      type: 'TODOLISTS/TASKS/REMOVE-TODOLIST',
      payload: { todolistId },
    } as const),
  setTodoListTitle: (todolistId: string, title: string) =>
    ({
      type: 'TODOLISTS/SET-TITLE',
      payload: { title, todolistId },
    } as const),
  setTodoListFilter: (todolistId: string, filter: FilterValuesType) =>
    ({
      type: 'TODOLISTS/SET-FILTER',
      payload: { todolistId, filter },
    } as const),
  setTodoListEntityStatus: (todolistId: string, status: RequestStatusType) =>
    ({
      type: 'TODOLISTS/SET-STATUS',
      payload: { todolistId, status },
    } as const),
  setTodoLists: (todolists: TodolistType[]) =>
    ({
      type: 'TODOLISTS/SET-TODOLISTS',
      payload: { todolists },
    } as const),
}

export const fetchTodolists = (): ThunkType => {
  return async (dispatch) => {
    try {
      dispatch(appActions.setStatus('loading'))
      const todolists = await todolistsApi.getTodolists()
      dispatch(actions.setTodoLists(todolists))
      dispatch(appActions.setStatus('succeeded'))
    } catch (err) {
      handleNetworkError(err as AxiosError, dispatch)
    }
  }
}
export const createTodolist = (title: string): ThunkType => {
  return async (dispatch) => {
    try {
      dispatch(appActions.setStatus('loading'))
      const data = await todolistsApi.createTodolist(title)
      if (data.resultCode === 0) {
        dispatch(actions.addNewTodoList(data.data.item))
        dispatch(appActions.setStatus('succeeded'))
      } else {
        handleServerError(data, dispatch)
      }
    } catch (err) {
      handleNetworkError(err as AxiosError, dispatch)
    }
  }
}
export const deleteTodolist = (todolistId: string): ThunkType => {
  return async (dispatch) => {
    try {
      dispatch(appActions.setStatus('loading'))
      dispatch(actions.setTodoListEntityStatus(todolistId, 'loading'))
      const data = await todolistsApi.deleteTodolist(todolistId)
      if (data.resultCode === 0) {
        dispatch(actions.removeTodoList(todolistId))
        dispatch(appActions.setStatus('succeeded'))
      } else {
        handleServerError(data, dispatch)
      }
    } catch (err) {
      handleNetworkError(err as AxiosError, dispatch)
    }
  }
}

export const changeTodolistTitle = (todolistId: string, title: string): ThunkType => {
  return async (dispatch) => {
    try {
      dispatch(appActions.setStatus('loading'))
      dispatch(actions.setTodoListEntityStatus(todolistId, 'loading'))
      const data = await todolistsApi.updateTodolist(todolistId, title)
      if (data.resultCode === 0) {
        dispatch(actions.setTodoListTitle(todolistId, title))
        dispatch(actions.setTodoListEntityStatus(todolistId, 'idle'))
        dispatch(appActions.setStatus('succeeded'))
      } else {
        handleServerError(data, dispatch)
      }
    } catch (err) {
      handleNetworkError(err as AxiosError, dispatch)
    }
  }
}
