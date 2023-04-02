import { actions, TodoListDomainType, todoListsReducer } from '../reducers/todoListsReducer'
import { TodoList } from './../../../01_Components/TodoList/Todolist'

const todoLIstId_1 = '87jhg8'
const todoLIstId_2 = '87jhg3'
const startState: TodoListDomainType[] = [
  {
    id: todoLIstId_1,
    title: 'What to learn',
    filter: 'all',
    addDate: '',
    order: 0,
    entityStatus: 'idle',
  },
  {
    id: todoLIstId_2,
    title: 'What to buy',
    filter: 'active',
    addDate: '',
    order: 0,
    entityStatus: 'idle',
  },
]

test('Todolist filter should be changed', () => {
  const newFilterValue = 'completed'
  const todolistIdToUpdate = todoLIstId_2
  const endState = todoListsReducer(startState, actions.setTodoListFilter(todolistIdToUpdate, newFilterValue))
  const updatedTodolist = endState.find((el) => el.id === todolistIdToUpdate)
  expect(updatedTodolist?.filter).toEqual(newFilterValue)
})
test('Todolist title should be renamed', () => {
  const newTitle = 'Hola'
  const todolistIdToUpdate = todoLIstId_1

  const endState = todoListsReducer(startState, actions.setTodoListTitle(todolistIdToUpdate, newTitle))
  const updatedTodolist = endState.find((el) => el.id === todolistIdToUpdate)
  expect(updatedTodolist?.title).toEqual(newTitle)
})
test('Todolist should be removed', () => {
  const todolistIdToDelete = todoLIstId_1

  const endState = todoListsReducer(startState, actions.removeTodoList(todolistIdToDelete))

  expect(endState.length).toEqual(1)
  expect(endState.some((el) => el.id === todolistIdToDelete)).toEqual(false)
})
test('Todolists should be set', () => {
  const endState = todoListsReducer([], actions.setTodoLists(startState))
  expect(endState.length).toEqual(2)
})
test('New Todolists should be created', () => {
  const newTodolistId = 'wj2389ewhjdkbwn'
  const newTodolist = {
    id: newTodolistId,
    title: 'Lucky',
    filter: 'all',
    addDate: '',
    order: 0,
  }
  const endState = todoListsReducer(startState, actions.addNewTodoList(newTodolist))
  expect(endState.length).toEqual(3)
  expect(endState.some((el) => el.id === newTodolistId)).toEqual(true)
})
test('Todolist status should be set to loading', () => {
  const status = 'loading'
  const endState = todoListsReducer(startState, actions.setTodoListEntityStatus(todoLIstId_1, status))
  const todoList = endState.find((t) => t.id === todoLIstId_1)
  expect(todoList?.entityStatus).toEqual(status)
})
