import { tasksReducer, actions } from "../reducers/tasksReducer"
import { actions as todolistsActions } from "../reducers/todoListsReducer"
import { TaskPriorities, TasksStatuses } from "../../../todolists.api"

const todoLIstId_1 = "87jhg8"
const todoLIstId_2 = "87jhg3"
const tasks = [
  {
    id: "1p",
    title: "Toyota oil",
    status: TasksStatuses.New,
    addedDate: "",
    deadline: "",
    order: 0,
    startDate: "",
    todoListId: "1",
    description: "",
    priority: TaskPriorities.Later,
  },
  {
    id: "o0l",
    title: "Glass cans",
    status: TasksStatuses.Completed,
    addedDate: "",
    deadline: "",
    order: 0,
    startDate: "",
    todoListId: "1",
    description: "",
    priority: TaskPriorities.Hi,
  },
]
const startState = {
  [todoLIstId_1]: [],
  [todoLIstId_2]: tasks,
}

test("Should create new task", () => {
  // To be able create new task, we have to have already existing todolist
  const endState = tasksReducer(
    startState,
    actions.addNewTask(todoLIstId_1, startState[todoLIstId_1][0])
  )
  expect(endState[todoLIstId_1].length).toEqual(1)
})
test("Should add an empty array of tasks, to newly creted todolist", () => {
  const newTodolist = {
    id: todoLIstId_1,
    title: "What to learn",
    filter: "all",
    addDate: "",
    order: 0,
  }
  const endState = tasksReducer(
    {},
    todolistsActions.addNewTodoList(newTodolist)
  )
  expect(endState[todoLIstId_1].length).toEqual(0)
  expect(endState[todoLIstId_1]).toBeInstanceOf(Array)
})
test("Should remove array of tasks, when removing corresponds todolist", () => {
  const endState = tasksReducer(
    startState,
    todolistsActions.removeTodoList(todoLIstId_1)
  )
  expect(endState[todoLIstId_1]).toBeUndefined()
})
test("Should set tasks to the corresponds todolist", () => {
  const endState = tasksReducer(
    startState,
    actions.setTasks(todoLIstId_1, tasks)
  )
  expect(endState[todoLIstId_1].length).toEqual(2)
})
test("Should remove task from todolist", () => {
  const taskIdToRemove = tasks[0].id
  const taskIdThatShouldNotBeRemoved = tasks[1].id
  const endState = tasksReducer(
    startState,
    actions.removeTask(todoLIstId_2, taskIdToRemove)
  )
  expect(endState[todoLIstId_2].length).toEqual(1)
  expect(
    endState[todoLIstId_2].find((el) => el.id === taskIdToRemove)
  ).toBeUndefined()
  expect(
    endState[todoLIstId_2].some((el) => el.id === taskIdThatShouldNotBeRemoved)
  ).toEqual(true)
})
test("Should update task title", () => {
  const newTitle = "Washington"
  const taskIdToUpdate = tasks[1].id
  const endState = tasksReducer(
    startState,
    actions.updateTask(todoLIstId_2, taskIdToUpdate, { title: newTitle })
  )

  const updatedTask = endState[todoLIstId_2].find(
    (el) => el.id === taskIdToUpdate
  )
  expect(updatedTask?.title).toEqual(newTitle)
})
test("Should update task status", () => {
  const newStatus = TasksStatuses.New
  const taskIdToUpdate = tasks[1].id
  const endState = tasksReducer(
    startState,
    actions.updateTask(todoLIstId_2, taskIdToUpdate, { status: newStatus })
  )
  const updatedTask = endState[todoLIstId_2].find(
    (el) => el.id === taskIdToUpdate
  )
  expect(updatedTask?.status).toEqual(newStatus)
})
