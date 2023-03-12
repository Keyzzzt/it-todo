import { BaseThunkType, InferActionTypes } from "../../../01_Base"
import { v1 } from "uuid"
import {TodolistType} from '../../../todolists.api'

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
    case "TODOLISTS/TASKS/ADD-TODOLIST":
      return [
        {
          id: action.payload.id,
          title: action.payload.title,
          filter: "all",
          addDate: '',
          order: 0,
        },
        ...state,
      ]
    case "TODOLISTS/TASKS/REMOVE-TODOLIST":
      return state.filter((t) => t.id !== action.payload.id)
    case "TODOLISTS/SET-TITLE":
      return state.map((t) =>
        t.id === action.payload.id ? { ...t, title: action.payload.title } : t
      )
    case "TODOLISTS/SET-FILTER":
      return state.map((t) =>
        t.id === action.payload.id ? { ...t, filter: action.payload.filter } : t
      )
    default:
      return state
  }
}
export const actions = {
  addNewTodoList: (title: string) => ({
    type: "TODOLISTS/TASKS/ADD-TODOLIST" as const,
    payload: { title, id: v1() },
  }),
  removeTodoList: (id: string) => ({
    type: "TODOLISTS/TASKS/REMOVE-TODOLIST" as const,
    payload: { id },
  }),
  setTodoListTitle: (id: string, title: string) => ({
    type: "TODOLISTS/SET-TITLE" as const,
    payload: { title, id },
  }),
  setTodoListFilter: (id: string, filter: FilterValuesType) => ({
    type: "TODOLISTS/SET-FILTER" as const,
    payload: { id, filter },
  }),
}
