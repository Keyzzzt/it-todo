import {
  AppBar,
  Button,
  Container,
  Grid,
  IconButton,
  Paper,
  Toolbar,
  Typography,
} from "@mui/material"
import { Menu } from "@mui/icons-material"
import { TodoList } from "./01_Components/TodoList/Todolist"
import {
  actions,
  changeTodolistTitle,
  createTodolist,
  deleteTodolist,
  fetchTodolists,
  FilterValuesType,
  TodoListDomainType,
} from "./store/reducers/reducers/todoListsReducer"
import {
  actions as tasksActions,
  updateTask,
  createTask,
  deleteTask,
  TasksStateType,
} from "./store/reducers/reducers/tasksReducer"
import { useDispatch, useSelector } from "react-redux"
import { StateType } from "./store/store"
import { AddItemForm } from "./01_Components/AddItemForm/AddItemForm"
import { useCallback, useEffect } from "react"
import { TasksStatuses, TaskType } from "./todolists.api"

export const App = () => {
  console.log("App   render")
  const todos = useSelector<StateType, Array<TodoListDomainType>>(
    (state) => state.todos
  )
  const tasks = useSelector<StateType, TasksStateType>((state) => state.tasks)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchTodolists())
  }, [dispatch])

  const addTodoList = useCallback(
    (title: string) => {
      dispatch(createTodolist(title))
    },
    [dispatch]
  )
  const removeTodoList = useCallback(
    (todoListId: string) => {
      dispatch(deleteTodolist(todoListId))
    },
    [dispatch]
  )
  const addTask = useCallback(
    (taskId: string, title: string) => {
      dispatch(createTask(taskId, title))
    },
    [dispatch]
  )
  const removeTask = useCallback(
    (taskId: string, todoListId: string): void => {
      dispatch(deleteTask(todoListId, taskId))
    },
    [dispatch]
  )
  const changeTodoListFilter = useCallback(
    (nextFilter: FilterValuesType, todoListId: string) => {
      dispatch(actions.setTodoListFilter(todoListId, nextFilter))
    },
    [dispatch]
  )
  const changeTodoListTitleHandler = useCallback(
    (newTitle: string, todoListId: string): void => {
      dispatch(changeTodolistTitle(todoListId, newTitle))
    },
    [dispatch]
  )
  const updateTaskStatusHandler = useCallback(
    (todoListId: string, taskId: string, status: TasksStatuses): void => {
      dispatch(updateTask(todoListId, taskId, { status }))
    },
    [dispatch]
  )
  const updateTaskTitleHandler = useCallback(
    (taskId: string, todoListId: string, title: string) => {
      dispatch(updateTask(todoListId, taskId, { title }))
    },
    [dispatch]
  )

  const todoListComponents = todos.length ? (
    todos.map((t) => (
      <Grid item key={t.id}>
        <Paper elevation={8} style={{ padding: "20px" }}>
          <TodoList
            todoListId={t.id}
            title={t.title}
            tasks={tasks[t.id]}
            filter={t.filter}
            addTask={addTask}
            removeTask={removeTask}
            changeTaskTitle={updateTaskTitleHandler}
            changeTaskStatus={updateTaskStatusHandler}
            addTodoList={addTodoList}
            removeTodoList={removeTodoList}
            changeTodoListFilter={changeTodoListFilter}
            changeTodoListTitle={changeTodoListTitleHandler}
          />
        </Paper>
      </Grid>
    ))
  ) : (
    <span>Please create todo list.</span>
  )

  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar style={{ justifyContent: "space-between" }}>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <Menu />
          </IconButton>
          <Typography variant="h6">To do list</Typography>
          <Button color="inherit" variant="outlined">
            Login
          </Button>
        </Toolbar>
      </AppBar>
      <Container fixed style={{ paddingTop: "30px" }}>
        <Grid container>
          <AddItemForm
            addItem={addTodoList}
            placeHolder={"Add new todo list"}
          />
        </Grid>
        <Grid container style={{ paddingTop: "30px" }} spacing={4}>
          {todoListComponents}
        </Grid>
      </Container>
    </div>
  )
}
