import { applyMiddleware, combineReducers, compose, createStore } from "redux"
import thunk from "redux-thunk"
import { tasksReducer } from "./reducers/reducers/tasksReducer"
import { todoListsReducer } from "./reducers/reducers/todoListsReducer"
import {TaskPriorities, TasksStatuses} from '../todolists.api'

const rootReducer = combineReducers({
  todos: todoListsReducer,
  tasks: tasksReducer,
})

const initialGlobalState = {
  todos: [
    { id: "1", title: "What to learn", filter: "all", addDate: '', order: 0  },
    { id: "2", title: "What to buy", filter: "active", addDate: '', order: 0  },
  ],
  tasks: {
    "1": [
      { id: "2w", title: "HTML&CSS", status: TasksStatuses.New, addedDate: '', deadline: '', order: 0, startDate: '', todoListId: '1', description: '', priority: TaskPriorities.Hi },
      { id: "5t", title: "JS", status: TasksStatuses.Completed, addedDate: '', deadline: '', order: 0, startDate: '', todoListId: '1', description: '', priority: TaskPriorities.Low },
    ],
    "2": [
      { id: "1p", title: "Toyota oil", status: TasksStatuses.New, addedDate: '', deadline: '', order: 0, startDate: '', todoListId: '1', description: '', priority: TaskPriorities.Later },
      { id: "o0l", title: "Glass cans", status: TasksStatuses.Completed, addedDate: '', deadline: '', order: 0, startDate: '', todoListId: '1', description: '', priority: TaskPriorities.Hi },
    ],
  },
}

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
// @ts-ignore
export const store = createStore(
  rootReducer,
  initialGlobalState as StateType,
  composeEnhancers(applyMiddleware(thunk))
)
export type StateType = ReturnType<typeof rootReducer>
