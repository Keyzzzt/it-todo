import { actions as todoListsActions } from "./todoListsReducer"
import { BaseThunkType, InferActionTypes } from "../../../01_Base"
import { v1 } from "uuid"

type ThunkType = BaseThunkType<ActionType>
type InitialStateType = typeof initialState
type ActionType =
  | InferActionTypes<typeof actions>
  | ReturnType<typeof todoListsActions.addNewTodoList>
  | ReturnType<typeof todoListsActions.removeTodoList>
export type TasksStateType = {
  [key: string]: Array<TaskType>
}
export type TaskType = {
  id: string
  title: string
  isDone: boolean
}

const initialState: TasksStateType = {
  '1': [
    { id: v1(), title: "HTML&CSS", isDone: true },
    { id: v1(), title: "JS", isDone: true },
    { id: v1(), title: "ReactJS", isDone: false },
  ],
  '2': [
    { id: v1(), title: "Toyota oil", isDone: false },
    { id: v1(), title: "Glass cans", isDone: false },
    { id: v1(), title: "Oil filter", isDone: false },
  ],
}
export const tasksReducer = (
  state: InitialStateType = initialState,
  action: ActionType
): TasksStateType => {
  switch (action.type) {
    case "TASKS/ADD-TASK":
      return {
        ...state,
        [action.payload.todoListId]: [
          ...state[action.payload.todoListId],
          { id: v1(), title: action.payload.taskTitle, isDone: false },
        ],
      }
    case "TODOLISTS/TASKS/ADD-TODOLIST":
      return { ...state, [action.payload.id]: [] }
      case "TODOLISTS/TASKS/REMOVE-TODOLIST":
        const stateCopy = {...state}
        delete stateCopy[action.payload.id]
        return stateCopy
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
    case "TASKS/SET-STATUS":
      return {
        ...state,
        [action.payload.todoListId]: state[action.payload.todoListId].map((t) =>
          t.id === action.payload.taskId
            ? { ...t, isDone: action.payload.status }
            : t
        ),
      }
    default:
      return state
  }
}
export const actions = {
  addNewTask: (todoListId: string, taskTitle: string) => ({
    type: "TASKS/ADD-TASK" as const,
    payload: { todoListId, taskTitle },
  }),
  removeTask: (todoListId: string, taskId: string) => ({
    type: "TASKS/REMOVE-SINGLE_TASK" as const,
    payload: { todoListId, taskId },
  }),
  renameTask: (todoListId: string, taskId: string, title: string) => ({
    type: "TASKS/RENAME-TASK" as const,
    payload: { todoListId, taskId, title },
  }),
  setTaskStatus: (todoListId: string, taskId: string, status: boolean) => ({
    type: "TASKS/SET-STATUS" as const,
    payload: { todoListId, taskId, status },
  }),
}
