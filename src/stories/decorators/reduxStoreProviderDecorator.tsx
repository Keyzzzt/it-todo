import { Provider } from 'react-redux'
import { applyMiddleware, combineReducers, createStore } from 'redux'
import thunk from 'redux-thunk'
import { appReducer } from '../../app/appReducer'
import { tasksReducer } from '../../store/reducers/reducers/tasksReducer'
import { todoListsReducer } from '../../store/reducers/reducers/todoListsReducer'
import { v1 } from 'uuid'
import { TaskPriorities, TasksStatuses } from '../../todolists.api'
import { loginReducer } from '../../store/reducers/reducers/loginReducer'

const rootReducer = combineReducers({
  app: appReducer,
  todos: todoListsReducer,
  tasks: tasksReducer,
  login: loginReducer,
})
const id1 = v1()
const id2 = v1()

const initialGlobalState: StateType = {
  app: { status: 'idle', error: '', isInitialized: false },
  todos: [
    { id: id1, title: 'New Todo', filter: 'all', entityStatus: 'idle', addDate: '', order: 0 },
    { id: id2, title: 'Old Todo', filter: 'all', entityStatus: 'loading', addDate: '', order: 0 },
  ],
  tasks: {
    [id1]: [
      {
        id: v1(),
        title: 'Classes',
        status: TasksStatuses.New,
        todoListId: id1,
        description: '',
        startDate: '',
        addedDate: '',
        deadline: '',
        order: 0,
        priority: TaskPriorities.Low,
      },
      {
        id: v1(),
        title: 'Finnish Incubator',
        status: TasksStatuses.New,
        todoListId: id1,
        description: '',
        startDate: '',
        addedDate: '',
        deadline: '',
        order: 0,
        priority: TaskPriorities.Low,
      },
      { id: v1(), title: 'RTK', status: TasksStatuses.New, todoListId: id1, description: '', startDate: '', addedDate: '', deadline: '', order: 0, priority: TaskPriorities.Low },
    ],
    [id2]: [
      {
        id: v1(),
        title: 'Classes',
        status: TasksStatuses.New,
        todoListId: id2,
        description: '',
        startDate: '',
        addedDate: '',
        deadline: '',
        order: 0,
        priority: TaskPriorities.Low,
      },
      {
        id: v1(),
        title: 'Finnish Incubator',
        status: TasksStatuses.New,
        todoListId: id2,
        description: '',
        startDate: '',
        addedDate: '',
        deadline: '',
        order: 0,
        priority: TaskPriorities.Low,
      },
      { id: v1(), title: 'RTK', status: TasksStatuses.New, todoListId: id2, description: '', startDate: '', addedDate: '', deadline: '', order: 0, priority: TaskPriorities.Low },
    ],
  },
  login: {
    isLoggedIn: false,
  },
}

export const storybookStore = createStore(rootReducer, initialGlobalState as StateType, applyMiddleware(thunk))
export type StateType = ReturnType<typeof rootReducer>

export const reduxStoreProviderDecorator = (storyFn: any) => {
  return <Provider store={storybookStore}>{storyFn()}</Provider>
}
