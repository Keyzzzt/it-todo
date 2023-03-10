import React, { useReducer } from "react"
// import { v1 } from "uuid"
// import { AddItemForm } from "./01_Components/AddItemForm"
// import {
//   AppBar,
//   Button,
//   Container,
//   Grid,
//   IconButton,
//   Paper,
//   Toolbar,
//   Typography,
// } from "@mui/material"
// import { Menu } from "@mui/icons-material"
// import { TodoList } from "./01_Components/TodoList/Todolist"
// import {
//   actions,
//   FilterValuesType,
//   todoListsReducer,
// } from "./store/reducers/reducers/todoListsReducer"
// import { actions as tasksActions } from "./store/reducers/reducers/tasksReducer"
// import { tasksReducer } from "./store/reducers/reducers/tasksReducer"

// // C - create (validation)
// // R - read (pagination, sorting, filtration)
// // U - update (validation)
// // D - delete (validation)

// export type TaskType = {
//   id: string
//   title: string
//   isDone: boolean
// }
// export type TodoListType = {
//   id: string
//   title: string
//   filter: FilterValuesType
// }

// export function AppUseReducer() {
//   const todoListId_1 = v1()
//   const todoListId_2 = v1()
//   const [todoLists, dispatchTodoLists] = useReducer(todoListsReducer, [
//     { id: todoListId_1, title: "What to learn", filter: "all" },
//     { id: todoListId_2, title: "What to buy", filter: "active" },
//   ])
//   const [tasks, dispatchTasks] = useReducer(tasksReducer, {
//     [todoListId_1]: [
//       { id: v1(), title: "HTML&CSS", isDone: true },
//       { id: v1(), title: "JS", isDone: true },
//       { id: v1(), title: "ReactJS", isDone: false },
//     ],
//     [todoListId_2]: [
//       { id: v1(), title: "Toyota oil", isDone: false },
//       { id: v1(), title: "Glass cans", isDone: false },
//       { id: v1(), title: "Oil filter", isDone: false },
//     ],
//   })

//   const addTodoList = (title: string) => {
//     const action = actions.addNewTodoList(title)
//     dispatchTodoLists(action)
//     dispatchTasks(action)
//   }
//   const removeTodoList = (todoListId: string) => {
//     const action = actions.removeTodoList(todoListId)
//     dispatchTodoLists(action)
//     dispatchTasks(action)
//   }

//   const addTask = (title: string, todoListId: string) => {
//     dispatchTasks(tasksActions.addNewTask(todoListId, title))
//   }
//   const removeTask = (taskId: string, todoListId: string): void => {
//     dispatchTasks(tasksActions.removeTask(todoListId, taskId))
//   }
//   const changeTodoListFilter = (
//     nextFilter: FilterValuesType,
//     todoListId: string
//   ) => {
//     dispatchTodoLists(actions.setTodoListFilter(todoListId, nextFilter))
//   }
//   const changeTodoListTitle = (newTitle: string, todoListId: string): void => {
//     dispatchTodoLists(actions.setTodoListTitle(todoListId, newTitle))
//   }
//   const changeTaskStatus = (
//     taskId: string,
//     newStatus: boolean,
//     todoListId: string
//   ): void => {
//     dispatchTasks(tasksActions.setTaskStatus(todoListId, taskId, newStatus))
//   }
//   const changeTaskTitle = (
//     taskId: string,
//     todoListId: string,
//     title: string
//   ) => {
//     dispatchTasks(tasksActions.renameTask(todoListId, taskId, title))
//   }

//   const getFilteredTasks = (
//     tasks: TaskType[],
//     filter: FilterValuesType
//   ): TaskType[] => {
//     if (filter === "active") {
//       return tasks.filter((t) => t.isDone === false)
//     } else if (filter === "completed") {
//       return tasks.filter((t) => t.isDone === true)
//     } else {
//       return tasks
//     }
//   }

//   const todoListComponents = todoLists.length ? (
//     todoLists.map((t) => {
//       const filteredTasks = getFilteredTasks(tasks[t.id], t.filter)
//       return (
//         <Grid item key={t.id}>
//           <Paper elevation={8} style={{ padding: "20px" }}>
//             <TodoList
//               todoListId={t.id}
//               title={t.title}
//               tasks={filteredTasks}
//               filter={t.filter}
//               addTask={addTask}
//               removeTask={removeTask}
//               changeTaskTitle={changeTaskTitle}
//               changeTaskStatus={changeTaskStatus}
//               addTodoList={addTodoList}
//               removeTodoList={removeTodoList}
//               changeTodoListFilter={changeTodoListFilter}
//               changeTodoListTitle={changeTodoListTitle}
//             />
//           </Paper>
//         </Grid>
//       )
//     })
//   ) : (
//     <span>Please create todo list.</span>
//   )

//   return (
//     <div className="App">
//       <AppBar position="static">
//         <Toolbar style={{ justifyContent: "space-between" }}>
//           <IconButton edge="start" color="inherit" aria-label="menu">
//             <Menu />
//           </IconButton>
//           <Typography variant="h6">To do list</Typography>
//           <Button color="inherit" variant="outlined">
//             Login
//           </Button>
//         </Toolbar>
//       </AppBar>
//       <Container fixed style={{ paddingTop: "30px" }}>
//         <Grid container>
//           <AddItemForm
//             addItem={addTodoList}
//             placeHolder={"Add new todo list"}
//           />
//         </Grid>
//         <Grid container style={{ paddingTop: "30px" }} spacing={4}>
//           {todoListComponents}
//         </Grid>
//       </Container>
//     </div>
//   )
// }
