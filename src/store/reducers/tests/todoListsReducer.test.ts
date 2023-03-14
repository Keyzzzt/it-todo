import {
  actions,
  TodoListDomainType,
  todoListsReducer,
} from "../reducers/todoListsReducer"

const todoLIstId_1 = "87jhg8"
const todoLIstId_2 = "87jhg3"
const startState: TodoListDomainType[] = [
  {
    id: todoLIstId_1,
    title: "What to learn",
    filter: "all",
    addDate: "",
    order: 0,
  },
  {
    id: todoLIstId_2,
    title: "What to buy",
    filter: "active",
    addDate: "",
    order: 0,
  },
]

test("Todolist filter should be changed", () => {
  const filterValue = "completed"
  const endState = todoListsReducer(
    startState,
    actions.setTodoListFilter(todoLIstId_2, filterValue)
  )

  expect(endState.find((el) => el.id === todoLIstId_2)!.filter).toEqual(
    filterValue
  )
})

test("Todolist should be renamed", () => {
  const renameTitle = "Hola"
  const endState = todoListsReducer(
    startState,
    actions.setTodoListTitle(todoLIstId_1, renameTitle)
  )
  expect(endState.some((el) => el.title === renameTitle)).toEqual(true)
})
test("Todolist should be removed", () => {
  const endState = todoListsReducer(
    startState,
    actions.removeTodoList(todoLIstId_2)
  )
  expect(endState.length).toEqual(1)
  expect(endState.some((el) => el.id === todoLIstId_2)).toEqual(false)
})
test("Todolists should  be set", () => {
  const todolists = [
    {
      id: "erf",
      title: "What to learn",
      filter: "all",
      addDate: "",
      order: 0,
    },
    {
      id: "sd",
      title: "What to buy",
      filter: "active",
      addDate: "",
      order: 0,
    },
  ]

  const endState = todoListsReducer([], actions.setTodoLists(todolists))
  expect(endState.length).toEqual(2)
})
