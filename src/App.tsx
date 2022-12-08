import React, { useEffect, useState } from "react"
import "./App.css"
import { TodoList } from "./Todolist"
import { v1 } from "uuid"

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

export function App() {
  // State
  const todoListTitle: string = "What to learn"
  const [tasks, setTasks] = useState<TaskType[]>([
    { id: v1(), title: "HTML&CSS", isDone: true },
    { id: v1(), title: "JS", isDone: true },
    { id: v1(), title: "ReactJS", isDone: false },
  ])
  const [filter, setFilter] = useState<FilterValuesType>("all")

  // Fn
  const removeTask = (id: string): void => {
    setTasks(tasks.filter((el) => el.id !== id))
  }
  const addTask = (title: string): void => {
    const newTask: TaskType = {
      id: v1(),
      title,
      isDone: false,
    }
    setTasks([newTask, ...tasks])
    // shorter
    // setTasks([{id: v1(), title, isDone: false}, ...tasks])
  }
  const changeTodoListFilter = (nextFilter: FilterValuesType) => {
    setFilter(nextFilter)
  }

  // Если мы не используем useEffect, то меняем фильтр в локальном стейте, и 
  // через пропсы передаем отсортированный массив. Tasks остается неизменным
  let tasksForRender: TaskType[]
  switch (filter) {
    case "completed":
      tasksForRender = tasks.filter((task) => task.isDone === true)
      break
    case "active":
      tasksForRender = tasks.filter((task) => task.isDone === false)
      break
    default:
      tasksForRender = tasks
  }

  const changeIsDoneStatus = (id: string, newStatus: boolean) => {
      // setTasks(tasks.map(task => task.id === id ? {...task, isDone: !task.isDone} : task))
      setTasks(tasks.map((task: TaskType)  => {
          if(task.id === id) {
              return {...task, isDone: newStatus}
          } else {
              return task
          }
      }))
  }

  // useEffect(()=> {
  //     if(filter === 'active') {
  //         setTasksForRender(tasks.filter(task => !task.isDone))
  //     } else if (filter === 'completed'){
  //         setTasksForRender(tasks.filter(task => task.isDone))
  //     } else {
  //         setTasksForRender([...tasks])
  //     }

  // }, [filter])

  return (
    <div className="App">
      <TodoList
        changeTodoListFilter={changeTodoListFilter}
        addTask={addTask}
        title={todoListTitle}
        filter={filter}
        tasks={tasksForRender}
        removeTask={removeTask}
        changeIsDoneStatus={changeIsDoneStatus}
      />
    </div>
  )
}
