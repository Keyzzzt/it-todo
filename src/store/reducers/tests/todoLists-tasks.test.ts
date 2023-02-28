import { tasksReducer, TasksStateType } from "./../reducers/tasksReducer"
import { TodoListType } from "../reducers/todoListsReducer"
import { actions, todoListsReducer } from "../reducers/todoListsReducer"

test("Should create new Todolist and new entry for this Todolist in tasks", () => {
  const startTodoListsState: TodoListType[] = []
  const startTasksState = {}
  const title = "Hola"

  const action = actions.addNewTodoList(title)

  const addNewTodoLIstEndState = todoListsReducer(startTodoListsState, action)
  const addNewTasksEntryEndState = tasksReducer(startTasksState, action)
  const idFromTodo = addNewTodoLIstEndState[0].id
  const idFromTasks = Object.keys(addNewTasksEntryEndState)[0]
  const titleFromTodo = addNewTodoLIstEndState[0].title

  expect(addNewTodoLIstEndState.length).toEqual(1)
  expect(titleFromTodo).toEqual(action.payload.title)

  expect(idFromTodo).toEqual(action.payload.id)
  expect(idFromTodo).toEqual(idFromTasks)
})

test("Should remove TodoList and tasks with same id", () => {
  const id1 = "1"
  const id2 = "2"

  const idToDelete = id1

  const todoStartState: Array<TodoListType> = [
    { id: id1, title: "What to learn", filter: "all" },
    { id: id2, title: "What to buy", filter: "active" },
  ]
  const tasksStartState: TasksStateType = {
    [id1]: [
      { id: "1", title: "HTML&CSS", isDone: true },
      { id: "2", title: "JS", isDone: true },
      { id: "3", title: "ReactJS", isDone: false },
    ],
    [id2]: [
      { id: "4", title: "Toyota oil", isDone: false },
      { id: "5", title: "Glass cans", isDone: false },
      { id: "6", title: "Oil filter", isDone: false },
    ],
  }


  const action = actions.removeTodoList(idToDelete)

  const removeTodoEndState = todoListsReducer(todoStartState, action)
  const removeTaskEndState = tasksReducer(tasksStartState, action)

  expect(removeTodoEndState.length).toEqual(1)
  expect(removeTodoEndState.some(el => el.id === idToDelete)).toEqual(false)

  expect(removeTaskEndState[idToDelete]).toEqual(undefined)
})
