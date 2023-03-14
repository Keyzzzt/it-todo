import { memo, useCallback, useEffect } from "react"
import s from "./todolist.module.css"
import { EditableSpan } from "../EditableSpan/EditableSpan"
import { Button, List } from "@mui/material"
import IconButton from "@mui/material/IconButton"
import DeleteForeverIcon from "@mui/icons-material/DeleteForever"
import { FilterValuesType } from "../../store/reducers/reducers/todoListsReducer"
import { AddItemForm } from "../AddItemForm/AddItemForm"
import { Task } from "../Task/Task"
import { TasksStatuses, TaskType } from "../../todolists.api"
import { fetchTasks } from "../../store/reducers/reducers/tasksReducer"
import { useDispatch } from "react-redux"

type PropsType = {
  todoListId: string
  title: string
  tasks: TaskType[]
  filter: string
  addTask: (title: string, removeTodoList: string) => void
  addTodoList: (title: string) => void
  removeTodoList: (todoListId: string) => void
  changeTodoListFilter: (
    nextFilterValue: FilterValuesType,
    removeTodoList: string
  ) => void
  changeTodoListTitle: (newTitle: string, todoListId: string) => void
  changeTaskStatus: (
    todoListId: string,
    taskId: string,
    status: TasksStatuses
  ) => void
  changeTaskTitle: (taskId: string, todoListId: string, title: string) => void
  removeTask: (id: string, removeTodoList: string) => void
}

export const TodoList = memo(
  ({
    todoListId,
    title,
    tasks,
    filter,
    removeTask,
    removeTodoList,
    addTask,
    changeTodoListFilter,
    changeTodoListTitle,
    changeTaskStatus,
    changeTaskTitle,
  }: PropsType) => {
    console.log("TodoList   render")

    const onClickHandlerCreator = (filter: FilterValuesType) => {
      return () => changeTodoListFilter(filter, todoListId)
    }
    const addTaskHandler = useCallback(
      (title: string) => {
        addTask(title, todoListId)
      },
      [addTask, todoListId]
    )

    const changeTitle = useCallback(
      (newTitle: string) => {
        changeTodoListTitle(newTitle, todoListId)
      },
      [changeTodoListTitle, todoListId]
    )
    const getFilteredTasks = (tasks: TaskType[]): TaskType[] => {
      if (filter === "active") {
        return tasks.filter((t) => t.status === TasksStatuses.New)
      } else if (filter === "completed") {
        return tasks.filter((t) => t.status === TasksStatuses.Completed)
      } else {
        return tasks
      }
    }
    const filteredTasks = getFilteredTasks(tasks)
    const tasksListItems = filteredTasks.map((task) => (
      <Task
        task={task}
        key={task.id}
        todolistId={todoListId}
        removeTask={removeTask}
        changeTaskStatus={changeTaskStatus}
        changeTaskTitle={changeTaskTitle}
      />
    ))

    const dispatch = useDispatch()
    useEffect(() => {
      dispatch(fetchTasks(todoListId))
    }, [dispatch, todoListId])

    return (
      <div>
        <h3>
          <EditableSpan title={title} changeTitle={changeTitle} />
          <IconButton size={"small"} onClick={() => removeTodoList(todoListId)}>
            <DeleteForeverIcon />
          </IconButton>
        </h3>

        <AddItemForm addItem={addTaskHandler} placeHolder={"Title"} />
        <List>{tasksListItems}</List>
        <div className={s.filterButtonsContainer}>
          <Button
            variant="contained"
            disableElevation
            color={filter === "all" ? "warning" : "primary"}
            onClick={onClickHandlerCreator("all")}
          >
            All
          </Button>
          <Button
            variant="contained"
            disableElevation
            color={filter === "active" ? "warning" : "primary"}
            onClick={onClickHandlerCreator("active")}
          >
            Active
          </Button>
          <Button
            variant="contained"
            color={filter === "completed" ? "warning" : "primary"}
            size="medium"
            disableElevation
            onClick={onClickHandlerCreator("completed")}
          >
            Completed
          </Button>
        </div>
      </div>
    )
  }
)
