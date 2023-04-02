import { actions, TodoListDomainType, todoListsReducer } from '../reducers/todoListsReducer'

test('Todolist Reducer', () => {
  const todoLIstId_1 = '87jhg8'
  const todoLIstId_2 = '87jhg3'
  const startState: TodoListDomainType[] = [
    { id: todoLIstId_1, title: 'What to learn', filter: 'all', addDate: '', order: 0, entityStatus: 'idle' },
    { id: todoLIstId_2, title: 'What to buy', filter: 'active', addDate: '', order: 0, entityStatus: 'idle' },
  ]

  const renameTitle = 'Hola'
  const filterValue = 'completed'
  const statusValue = 'loading'

  const removeTodoLIstEndState = todoListsReducer(startState, actions.removeTodoList(todoLIstId_2))
  const renameTodoLIstEndState = todoListsReducer(startState, actions.setTodoListTitle(todoLIstId_1, renameTitle))
  const setTodoLIstFilterEndState = todoListsReducer(startState, actions.setTodoListFilter(todoLIstId_2, filterValue))
  const setTodoLIstStatusEndState = todoListsReducer(startState, actions.setTodoListEntityStatus(todoLIstId_2, statusValue))

  expect(removeTodoLIstEndState.length).toEqual(1)
  expect(removeTodoLIstEndState.some((el) => el.id === todoLIstId_2)).toEqual(false)

  const filterToCheck = setTodoLIstFilterEndState.find((el) => el.id === todoLIstId_2)?.filter
  const statusToCheck = setTodoLIstStatusEndState.find((el) => el.id === todoLIstId_2)?.entityStatus
  expect(filterToCheck).toEqual(filterValue)
  expect(statusToCheck).toEqual(statusValue)

  expect(renameTodoLIstEndState.some((el) => el.title === renameTitle)).toEqual(true)

  // expect(setTodoLIstFilterEndState.find((el) => el.id === todoLIstId_2)!.filter).toEqual(filterValue)
})
