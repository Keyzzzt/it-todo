import {actions, TodoListDomainType, todoListsReducer} from '../reducers/todoListsReducer'

test("Tasks Reducer", () => {
  const todoLIstId_1 = "87jhg8"
  const todoLIstId_2 = "87jhg3"
  const startState: TodoListDomainType[] = [
    { id: todoLIstId_1, title: "What to learn", filter: "all", addDate: '', order: 0 },
    { id: todoLIstId_2, title: "What to buy", filter: "active", addDate: '', order: 0  },
  ]

  const renameTitle = "Hola"
  const filterValue = 'completed'

  const removeTodoLIstEndState = todoListsReducer(
    startState,
    actions.removeTodoList(todoLIstId_2)
  )
  const renameTodoLIstEndState = todoListsReducer(
    startState,
    actions.setTodoListTitle(todoLIstId_1, renameTitle)
  )
  const setTodoLIstFilterEndState = todoListsReducer(
    startState,
    actions.setTodoListFilter(todoLIstId_2, filterValue)
  )

  expect(removeTodoLIstEndState.length).toEqual(1)
    expect(
    removeTodoLIstEndState.some((el) => el.id === todoLIstId_2)
    ).toEqual(false)
     
    expect(
      renameTodoLIstEndState.some((el) => el.title === renameTitle)
      ).toEqual(true)


      
      // expect(setTodoLIstFilterEndState.find((el) => el.id === todoLIstId_2)!.filter).toEqual(filterValue)
})
