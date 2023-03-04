import { applyMiddleware, combineReducers, compose, createStore } from 'redux'
import thunk from 'redux-thunk'
import { tasksReducer } from './reducers/reducers/tasksReducer'
import { todoListsReducer } from './reducers/reducers/todoListsReducer'


const rootReducer = combineReducers({
  todos: todoListsReducer,
  tasks: tasksReducer,
})


// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
// @ts-ignore
export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))
export type StateType = ReturnType<typeof rootReducer>
