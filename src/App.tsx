import React, {useState} from "react"
import "./App.css"
import {TodoList} from "./01_Components/TodoList/Todolist"
import {v1} from "uuid"
import {AddTaskForm} from "./01_Components/AddTaskForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";

// C - create (validation)
// R - read (pagination, sorting, filtration)
// U - update (validation)
// D - delete (validation)

export type FilterValuesType = "all" | "active" | "completed"
export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
export type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

export function App() {
    // State
    const todoListId_1 = v1()
    const todoListId_2 = v1()
    const [todoLists, setTodoLists] = useState<TodoListType[]>([
        {id: todoListId_1, title: 'What to learn', filter: 'all'},
        {id: todoListId_2, title: 'What to buy', filter: 'active'},
    ])
    const [tasks, setTasks] = useState<{ [todoListId: string]: TaskType[] }>({
        [todoListId_1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
        ],
        [todoListId_2]: [
            {id: v1(), title: "Toyota oil", isDone: false},
            {id: v1(), title: "Glass cans", isDone: false},
            {id: v1(), title: "Oil filter", isDone: false},
        ]
    })
    // Fn
    const addTodoList = (title: string) => {
        const newTodoListId = v1()
        const newTodoList: TodoListType = {
            id: newTodoListId,
            title,
            filter: 'all'
        }
        setTodoLists([...todoLists, newTodoList])
        setTasks({...tasks, [newTodoListId]: []})
    }
    const removeTodoList = (todoListId: string) => setTodoLists(todoLists.filter(t => t.id !== todoListId))
    const changeTodoListFilter = (nextFilter: FilterValuesType, todoListId: string): void => {
        setTodoLists(todoLists.map(list => list.id === todoListId ? {...list, filter: nextFilter} : list))
    }
    const changeTodoListTitle = (newTitle: string, todoListId: string): void => {
        setTodoLists(todoLists.map(list => list.id === todoListId ? {...list, title: newTitle} : list))
    }


    const addTask = (title: string, todoListId: string) => {
        const newTask: TaskType = {
            id: v1(),
            title,
            isDone: false,
        }
        setTasks({...tasks, [todoListId]: [newTask, ...tasks[todoListId]]})
    }
    const removeTask = (taskId: string, todoListId: string): void => {
        setTasks({...tasks, [todoListId]: tasks[todoListId].filter(task => task.id !== taskId)})
    }
    const changeTaskStatus = (id: string, newStatus: boolean, todoListId: string): void => {
        setTasks({
            ...tasks,
            [todoListId]: tasks[todoListId].map(task => task.id === id ? {...task, isDone: newStatus} : task)
        })
    }
    const changeTaskTitle = (taskId: string, todoListId: string, title: string) => {
        setTasks({...tasks, [todoListId]: tasks[todoListId].map(task => task.id === taskId ? {...task, title} : task)})
    }
    const getFilteredTasks = (tasks: TaskType[], filter: FilterValuesType): TaskType[] => {
        if (filter === 'active') {
            return tasks.filter(t => t.isDone === false)
        } else if (filter === 'completed') {
            return tasks.filter(t => t.isDone === true)
        } else {
            return tasks
        }
    }

    const todoListComponents = todoLists.length
        ? todoLists.map(t => {
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
