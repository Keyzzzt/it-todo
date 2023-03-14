import { actions as todoListsActions } from "./todoListsReducer"
import { BaseThunkType, InferActionTypes } from "../../../01_Base"
import axios from "axios"
import {
  ServerError,
  TaskPriorities,
  TasksStatuses,
  TaskType,
  todolistsApi,
  UpdateTaskServerModelType,
} from "../../../todolists.api"

type ThunkType = BaseThunkType<ActionType>
type InitialStateType = typeof initialState
type ActionType =
  | InferActionTypes<typeof actions>
  | ReturnType<typeof todoListsActions.addNewTodoList>
  | ReturnType<typeof todoListsActions.removeTodoList>
  | ReturnType<typeof todoListsActions.setTodoLists>
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
export const tasksReducer = (
  state: InitialStateType = initialState,
  action: ActionType
): TasksStateType => {
  switch (action.type) {
    case "TASKS/CREATE-TASK":
      return {
        ...state,
        [action.payload.todoListId]: [
          action.payload.task,
          ...state[action.payload.todoListId],
        ],
      }
    case "TODOLISTS&TASKS/CREATE-TODOLIST&TASKS": {
      return { ...state, [action.payload.todolistId]: [] }
    }

    case "TODOLISTS/TASKS/REMOVE-TODOLIST": {
      const stateCopy = { ...state }
      delete stateCopy[action.payload.todolistId]
      return stateCopy
    }

    case "TODOLISTS&TASKS/SET-TODOLISTS&TASKS": {
      const stateCopy = { ...state }
      action.payload.todolists.forEach((t) => {
        stateCopy[t.id] = []
      })

      return stateCopy
    }

    case "TASKS/REMOVE-SINGLE_TASK":
      return {
        ...state,
        [action.payload.todoListId]: state[action.payload.todoListId].filter(
          (t) => t.id !== action.payload.taskId
        ),
      }
    case "TASKS/RENAME-TASK":
      return {
        ...state,
        [action.payload.todoListId]: state[action.payload.todoListId].map((t) =>
          t.id === action.payload.taskId
            ? { ...t, title: action.payload.title }
            : t
        ),
      }
    case "TASKS/UPDATE":
      return {
        ...state,
        [action.payload.todoListId]: state[action.payload.todoListId].map((t) =>
          t.id === action.payload.taskId ? { ...t, ...action.payload.model } : t
        ),
      }
    case "TASKS/SET-TASKS": {
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
      type: "TASKS/CREATE-TASK",
      payload: { todoListId, task },
    } as const),
  removeTask: (todoListId: string, taskId: string) =>
    ({
      type: "TASKS/REMOVE-SINGLE_TASK",
      payload: { todoListId, taskId },
    } as const),
  renameTask: (todoListId: string, taskId: string, title: string) =>
    ({
      type: "TASKS/RENAME-TASK",
      payload: { todoListId, taskId, title },
    } as const),
  updateTask: (
    todoListId: string,
    taskId: string,
    model: UpdateTaskLocalModelType
  ) =>
    ({
      type: "TASKS/UPDATE",
      payload: { todoListId, taskId, model },
    } as const),
  setTasks: (todoListId: string, tasks: TaskType[]) =>
    ({
      type: "TASKS/SET-TASKS",
      payload: { todoListId, tasks },
    } as const),
}

export const fetchTasks = (todolistId: string): ThunkType => {
  return async (dispatch) => {
    try {
      const tasks = await todolistsApi.getTasks(todolistId)
      dispatch(actions.setTasks(todolistId, tasks.items))
    } catch (err) {
      if (axios.isAxiosError<ServerError>(err)) {
        if (err && err.response) {
          // dispatch(actions.setErrorData(err.response.data.message, err.response.data.fails))
        }
      } else {
        console.error(err)
      }
    }
  }
}
export const deleteTask = (todolistId: string, taskId: string): ThunkType => {
  return async (dispatch) => {
    try {
      await todolistsApi.deleteTask(todolistId, taskId)
      dispatch(actions.removeTask(todolistId, taskId))
    } catch (err) {
      if (axios.isAxiosError<ServerError>(err)) {
        if (err && err.response) {
          // dispatch(actions.setErrorData(err.response.data.message, err.response.data.fails))
        }
      } else {
        console.error(err)
      }
    }
  }
}
export const createTask = (
  todolistId: string,
  taskTitle: string
): ThunkType => {
  return async (dispatch) => {
    try {
      const newTask = await todolistsApi.createTask(todolistId, taskTitle)
      console.log(newTask)

      dispatch(actions.addNewTask(todolistId, newTask))
    } catch (err) {
      if (axios.isAxiosError<ServerError>(err)) {
        if (err && err.response) {
          // dispatch(actions.setErrorData(err.response.data.message, err.response.data.fails))
        }
      } else {
        console.error(err)
      }
    }
  }
}

export const updateTask = (
  todolistId: string,
  taskId: string,
  localModel: UpdateTaskLocalModelType
): ThunkType => {
  return async (dispatch, getState) => {
    try {
      const state = getState()
      const task = state.tasks[todolistId].find((t) => t.id === taskId)
      if (!task) {
        console.warn("Task not found")
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
      await todolistsApi.updateTask(todolistId, taskId, apiModel)

      dispatch(actions.updateTask(todolistId, taskId, apiModel))
    } catch (err) {
      if (axios.isAxiosError<ServerError>(err)) {
        if (err && err.response) {
          // dispatch(actions.setErrorData(err.response.data.message, err.response.data.fails))
        }
      } else {
        console.error(err)
      }
    }
  }
}
