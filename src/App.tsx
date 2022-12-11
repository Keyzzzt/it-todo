import { useState } from "react"
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
  const [tasks, setTasks] = useState<{[todoListId: string]: TaskType[]}>({
    [todoListId_1]: [
      { id: v1(), title: "HTML&CSS", isDone: true },
      { id: v1(), title: "JS", isDone: true },
      { id: v1(), title: "ReactJS", isDone: false },
    ],
    [todoListId_2]: [
      { id: v1(), title: "Toyota oil", isDone: false },
      { id: v1(), title: "Glass cans", isDone: false },
      { id: v1(), title: "Oil filter", isDone: false },
    ]
  })
  // Fn
  const addTodoList = (title: string): void => {

  }
  const removeTodoList = (todoListId: string): void => setTodoLists(todoLists.filter(t => t.id !== todoListId))

  const addTask = (title: string, todoListId: string): void => {
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

  const changeFilter = (nextFilter: FilterValuesType, todoListId: string): void => {
    setTodoLists(todoLists.map(list => list.id === todoListId ? {...list, filter: nextFilter} : list))
  }

  const changeStatus = (id: string, newStatus: boolean, todoListId: string): void => {
      setTasks({...tasks, [todoListId]: tasks[todoListId].map(task => task.id === id ? {...task, isDone: newStatus} : task)})
  }

  const getFilteredTasks = (tasks: TaskType[], filter: FilterValuesType):TaskType[] => {
    if(filter === 'active') {
      return tasks.filter(t => t.isDone === false)
    } else if (filter === 'completed') {
      return tasks.filter(t => t.isDone === true)
  } else {
    return tasks
  }
}

  const todoListComponents = todoLists.length 
  ?  todoLists.map(tl => {
    const filteredTasks = getFilteredTasks(tasks[tl.id], tl.filter)
    return (
      <TodoList
        key={tl.id}
        id={tl.id}
        title={tl.title}
        tasks={filteredTasks}
        filter={tl.filter}
        
        addTask={addTask}
        removeTask={removeTask}
        removeTodoList={removeTodoList}
        changeFilter={changeFilter}
        changeStatus={changeStatus}
    />
    )
  }) 
  : <span>Please create todo list.</span>

  return (
    <div className="App">
      {todoListComponents}
    </div>
  )
}
