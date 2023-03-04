import {AddTaskForm} from "./01_Components/AddTaskForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";
import { TodoList } from "./01_Components/TodoList/Todolist";
import { actions, FilterValuesType, TodoListType } from "./store/reducers/reducers/todoListsReducer";
import {actions as tasksActions, TasksStateType, TaskType} from './store/reducers/reducers/tasksReducer'
import { useDispatch, useSelector } from "react-redux";
import { StateType } from "./store/store";


// C - create (validation)
// R - read (pagination, sorting, filtration)
// U - update (validation)
// D - delete (validation)





export function AppRedux() {
  const todos = useSelector<StateType, Array<TodoListType>>(state => state.todos)
  const tasks = useSelector<StateType, TasksStateType>(state => state.tasks)
  const dispatch = useDispatch()

  const addTodoList = (title: string) => {
    const action = actions.addNewTodoList(title)
    dispatch(action)
    dispatch(action)
  }
  const removeTodoList = (todoListId: string) =>{
    const action = actions.removeTodoList(todoListId)
    dispatch(action)
    dispatch(action)
  }

  const addTask = (title: string, todoListId: string) => {
    dispatch(tasksActions.addNewTask(todoListId, title))
  }
  const removeTask = (taskId: string, todoListId: string): void => {
    dispatch(tasksActions.removeTask(todoListId, taskId))
  }
  const changeTodoListFilter = (
    nextFilter: FilterValuesType,
    todoListId: string
  ) => {
    dispatch(actions.setTodoListFilter(todoListId, nextFilter))
  }
  const changeTodoListTitle = (newTitle: string, todoListId: string): void => {
    dispatch(actions.setTodoListTitle(todoListId, newTitle))
  }
  const changeTaskStatus = (
    taskId: string,
    newStatus: boolean,
    todoListId: string
  ): void => {
    dispatch(tasksActions.setTaskStatus(todoListId, taskId, newStatus))
  }
  const changeTaskTitle = (
    taskId: string,
    todoListId: string,
    title: string
  ) => {
    dispatch(tasksActions.renameTask(todoListId, taskId, title))
  }

  const getFilteredTasks = (
    tasks: TaskType[],
    filter: FilterValuesType
  ): TaskType[] => {
    if (filter === "active") {
      return tasks.filter((t) => t.isDone === false)
    } else if (filter === "completed") {
      return tasks.filter((t) => t.isDone === true)
    } else {
      return tasks
    }
  }

    const todoListComponents = todos.length
        ? todos.map(t => {
            const filteredTasks = getFilteredTasks(tasks[t.id], t.filter)
            return (
                <Grid item key={t.id} >
                    <Paper elevation={8} style={{padding: '20px'}}>
                        <TodoList
                            todoListId={t.id}
                            title={t.title}
                            tasks={filteredTasks}
                            filter={t.filter}

                            addTask={addTask}
                            removeTask={removeTask}
                            changeTaskTitle={changeTaskTitle}
                            changeTaskStatus={changeTaskStatus}

                            addTodoList={addTodoList}
                            removeTodoList={removeTodoList}
                            changeTodoListFilter={changeTodoListFilter}
                            changeTodoListTitle={changeTodoListTitle}
                        />
                    </Paper>
                </Grid>
            )
        })
        : <span>Please create todo list.</span>

    return (
        <div className="App">
            <AppBar position='static'>
                <Toolbar style={{justifyContent: 'space-between'}}>
                    <IconButton edge='start' color='inherit' aria-label='menu'>
                        <Menu />
                    </IconButton>
                    <Typography variant='h6'>
                        To do list
                    </Typography>
                    <Button color='inherit' variant='outlined'>Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed style={{paddingTop: '30px'}}>
                <Grid container>
                    <AddTaskForm addItem={addTodoList} placeHolder={'Add new todo list'}/>
                </Grid>
                <Grid container style={{paddingTop: '30px'}} spacing={4}>
                    {todoListComponents}
                </Grid>
            </Container>
        </div>
    )
}
