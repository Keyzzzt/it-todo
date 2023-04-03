import { applyMiddleware, combineReducers, compose, createStore } from 'redux'
import thunk from 'redux-thunk'
import { tasksReducer } from './reducers/reducers/tasksReducer'
import { todoListsReducer } from './reducers/reducers/todoListsReducer'
import { appReducer } from '../app/appReducer'
import { loginReducer } from './reducers/reducers/loginReducer'

const rootReducer = combineReducers({
  app: appReducer,
  login: loginReducer,
  todos: todoListsReducer,
  tasks: tasksReducer,
})

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))
export type StateType = ReturnType<typeof rootReducer>
