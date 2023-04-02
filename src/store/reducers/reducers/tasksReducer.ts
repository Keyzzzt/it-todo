import { actions as todoListsActions } from './todoListsReducer'
import { actions as appActions } from '../../../app/appReducer'
import { BaseThunkType, InferActionTypes } from '../../../01_Base'
import { TaskPriorities, TasksStatuses, TaskType, todolistsApi, UpdateTaskServerModelType } from '../../../todolists.api'
import { handleNetworkError, handleServerError } from '../../../utils/handleError'
import { AxiosError } from 'axios'

type ThunkType = BaseThunkType<ActionType>
type InitialStateType = typeof initialState
type ActionType =
  | InferActionTypes<typeof actions>
  | ReturnType<typeof todoListsActions.addNewTodoList>
  | ReturnType<typeof todoListsActions.removeTodoList>
  | ReturnType<typeof todoListsActions.setTodoLists>
  | ReturnType<typeof appActions.setStatus>
export type TasksStateType = {
  [key: string]: Array<TaskType>
}
export type UpdateTaskLocalModelType = {
  title?: string
  description?: string
  status?: TasksStatuses
  priority?: TaskPriorities
  startDate?: string
  deadline?: string
}
const initialState: TasksStateType = {}
export const tasksReducer = (state: InitialStateType = initialState, action: ActionType): TasksStateType => {
  switch (action.type) {
    case 'TASKS/CREATE-TASK':
      return {
        ...state,
        [action.payload.todoListId]: [action.payload.task, ...state[action.payload.todoListId]],
      }
    case 'TODOLISTS&TASKS/CREATE-TODOLIST&TASKS': {
      return { ...state, [action.payload.todolistId]: [] }
    }

    case 'TODOLISTS/TASKS/REMOVE-TODOLIST': {
      const stateCopy = { ...state }
      delete stateCopy[action.payload.todolistId]
      return stateCopy
    }

    case 'TASKS/REMOVE-SINGLE_TASK':
      return {
        ...state,
        [action.payload.todoListId]: state[action.payload.todoListId].filter((t) => t.id !== action.payload.taskId),
      }
    case 'TASKS/UPDATE':
      return {
        ...state,
        [action.payload.todoListId]: state[action.payload.todoListId].map((t) => (t.id === action.payload.taskId ? { ...t, ...action.payload.model } : t)),
      }
    case 'TASKS/SET-TASKS': {
      const stateCopy = { ...state }
      stateCopy[action.payload.todoListId] = action.payload.tasks
      return stateCopy
    }

    default:
      return state
  }
}
export const actions = {
  addNewTask: (todoListId: string, task: TaskType) =>
    ({
      type: 'TASKS/CREATE-TASK',
      payload: { todoListId, task },
    } as const),
  removeTask: (todoListId: string, taskId: string) =>
    ({
      type: 'TASKS/REMOVE-SINGLE_TASK',
      payload: { todoListId, taskId },
    } as const),
  updateTask: (todoListId: string, taskId: string, model: UpdateTaskLocalModelType) =>
    ({
      type: 'TASKS/UPDATE',
      payload: { todoListId, taskId, model },
    } as const),
  setTasks: (todoListId: string, tasks: TaskType[]) =>
    ({
      type: 'TASKS/SET-TASKS',
      payload: { todoListId, tasks },
    } as const),
}

export const fetchTasks = (todolistId: string): ThunkType => {
  return async (dispatch) => {
    try {
      const data = await todolistsApi.getTasks(todolistId)
      dispatch(actions.setTasks(todolistId, data.items))
    } catch (err) {
      handleNetworkError(err as AxiosError, dispatch)
    }
  }
}
export const deleteTask = (todolistId: string, taskId: string): ThunkType => {
  return async (dispatch) => {
    try {
      const data = await todolistsApi.deleteTask(todolistId, taskId)
      if (data.resultCode === 0) {
        dispatch(actions.removeTask(todolistId, taskId))
        dispatch(appActions.setStatus('succeeded'))
      } else {
        handleServerError(data, dispatch)
      }
    } catch (err) {
      handleNetworkError(err as AxiosError, dispatch)
    }
  }
}
export const createTask = (todolistId: string, taskTitle: string): ThunkType => {
  return async (dispatch) => {
    try {
      const data = await todolistsApi.createTask(todolistId, taskTitle)
      if (data.resultCode === 0) {
        dispatch(actions.addNewTask(todolistId, data.data.item))
      } else {
        handleServerError(data, dispatch)
      }
    } catch (err) {
      handleNetworkError(err as AxiosError, dispatch)
    }
  }
}

export const updateTask = (todolistId: string, taskId: string, localModel: UpdateTaskLocalModelType): ThunkType => {
  return async (dispatch, getState) => {
    try {
      const state = getState()
      const task = state.tasks[todolistId].find((t) => t.id === taskId)
      if (!task) {
        console.warn('Task not found')
        return
      }
      const apiModel: UpdateTaskServerModelType = {
        title: task.title,
        description: task.description,
        status: task.status,
        priority: task.priority,
        startDate: task.startDate,
        deadline: task.deadline,
        ...localModel,
      }
      const data = await todolistsApi.updateTask(todolistId, taskId, apiModel)
      if (data.resultCode === 0) {
        dispatch(actions.updateTask(todolistId, taskId, apiModel))
      } else {
        handleServerError(data, dispatch)
      }
    } catch (err) {
      handleNetworkError(err as AxiosError, dispatch)
    }
  }
}
