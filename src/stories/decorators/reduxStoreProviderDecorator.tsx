import { Provider } from "react-redux"
import { applyMiddleware, combineReducers, compose, createStore } from "redux"
import thunk from "redux-thunk"
import { tasksReducer } from "../../store/reducers/reducers/tasksReducer"
import { todoListsReducer } from "../../store/reducers/reducers/todoListsReducer"

const rootReducer = combineReducers({
  todos: todoListsReducer,
  tasks: tasksReducer,
})

const initialGlobalState = {
  todos: [
    { id: "1", title: "What to learn", filter: "all" },
    { id: "2", title: "What to buy", filter: "active" },
  ],
  tasks: {
    "1": [
      { id: "2w", title: "HTML&CSS", isDone: true },
      { id: "5t", title: "JS", isDone: true },
      { id: "4l", title: "ReactJS", isDone: false },
    ],
    "2": [
      { id: "1p", title: "Toyota oil", isDone: false },
      { id: "o0l", title: "Glass cans", isDone: false },
      { id: "kd8", title: "Oil filter", isDone: false },
    ],
  },
}

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
// @ts-ignore
export const storybookStore = createStore(
  rootReducer,
  initialGlobalState as StateType,
  composeEnhancers(applyMiddleware(thunk))
)
export type StateType = ReturnType<typeof rootReducer>

export const reduxStoreProviderDecorator = (storyFn: any) => {
  return <Provider store={storybookStore}>{storyFn()}</Provider>
}
