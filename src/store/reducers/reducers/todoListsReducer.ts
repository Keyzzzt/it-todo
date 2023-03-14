import { BaseThunkType, InferActionTypes } from "../../../01_Base"
import { v1 } from "uuid"
import { ServerError, todolistsApi, TodolistType } from "../../../todolists.api"
import axios from "axios"

type ThunkType = BaseThunkType<ActionType>
type InitialStateType = typeof initialState
type ActionType = InferActionTypes<typeof actions>

export type FilterValuesType = "all" | "active" | "completed"
export type TodoListDomainType = TodolistType & {
  filter: FilterValuesType
}

const initialState: TodoListDomainType[] = []
export const todoListsReducer = (
  state: InitialStateType = initialState,
  action: ActionType
): TodoListDomainType[] => {
  switch (action.type) {
    case "TODOLISTS/SET-FILTER":
      return state.map((t) =>
        t.id === action.payload.todolistId
          ? { ...t, filter: action.payload.filter }
          : t
      )
    case "TODOLISTS/SET-TITLE":
      return state.map((t) =>
        t.id === action.payload.todolistId
          ? { ...t, title: action.payload.title }
          : t
      )
    case "TODOLISTS/TASKS/REMOVE-TODOLIST":
      return state.filter((t) => t.id !== action.payload.todolistId)
    case "TODOLISTS/SET-TODOLISTS":
      return action.payload.todolists.map((t) => ({ ...t, filter: "all" }))

    case "TODOLISTS&TASKS/CREATE-TODOLIST&TASKS":
      return [{ ...action.payload.todolist, filter: "all" }, ...state]

    default:
      return state
  }
}
export const actions = {
  addNewTodoList: (todolist: TodolistType) =>
    ({
      type: "TODOLISTS&TASKS/CREATE-TODOLIST&TASKS",
      payload: { todolist, todolistId: todolist.id },
    } as const),
  removeTodoList: (todolistId: string) =>
    ({
      type: "TODOLISTS/TASKS/REMOVE-TODOLIST",
      payload: { todolistId },
    } as const),
  setTodoListTitle: (todolistId: string, title: string) =>
    ({
      type: "TODOLISTS/SET-TITLE",
      payload: { title, todolistId },
    } as const),
  setTodoListFilter: (todolistId: string, filter: FilterValuesType) =>
    ({
      type: "TODOLISTS/SET-FILTER",
      payload: { todolistId, filter },
    } as const),
  setTodoLists: (todolists: TodolistType[]) =>
    ({
      type: "TODOLISTS/SET-TODOLISTS",
      payload: { todolists },
    } as const),
}

export const fetchTodolists = (): ThunkType => {
  return async (dispatch) => {
    try {
      const todolists = await todolistsApi.getTodolists()
      dispatch(actions.setTodoLists(todolists))
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
export const createTodolist = (title: string): ThunkType => {
  return async (dispatch) => {
    try {
      const todolist = await todolistsApi.createTodolist(title)
      dispatch(actions.addNewTodoList(todolist))
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
export const deleteTodolist = (todolistId: string): ThunkType => {
  return async (dispatch) => {
    try {
      await todolistsApi.deleteTodolist(todolistId)
      dispatch(actions.removeTodoList(todolistId))
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

export const changeTodolistTitle = (
  todolistId: string,
  title: string
): ThunkType => {
  return async (dispatch) => {
    try {
      await todolistsApi.updateTodolist(todolistId, title)
      dispatch(actions.setTodoListTitle(todolistId, title))
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
