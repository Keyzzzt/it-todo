import React, { ChangeEvent } from "react"
import { AddTaskForm } from "../AddTaskForm"
import { FilterValuesType, TaskType } from "../../App"
import s from "./TodoList.module.css"
import { EditableSpan } from "../EditableSpan/EditableSpan"
import {Button, List, ListItem} from "@mui/material"
import IconButton from "@mui/material/IconButton"
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

type PropsType = {
  todoListId: string
  title: string
  tasks: TaskType[]
  filter: string
  addTask: (title: string, removeTodoList: string) => void
  removeTask: (id: string, removeTodoList: string) => void
  addTodoList: (title: string) => void
  removeTodoList: (todoListId: string) => void
  changeTodoListFilter: (
    nextFilterValue: FilterValuesType,
    removeTodoList: string
  ) => void
  changeTodoListTitle: (newTitle: string, todoListId: string) => void
  changeTaskStatus: (
    taskId: string,
    status: boolean,
    removeTodoList: string
  ) => void
  changeTaskTitle: (taskId: string, todoListId: string, title: string) => void
}

export function TodoList({
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
}: PropsType) {
  const onClickHandlerCreator = (filter: FilterValuesType) => {
    return () => changeTodoListFilter(filter, todoListId)
  }
  const addTaskHandler = (title: string) => {
    addTask(title, todoListId)
  }
  const changeTitle = (newTitle: string) => {
    changeTodoListTitle(newTitle, todoListId)
  }
  const tasksListItems = tasks.map((task) => {
    const remove = () => removeTask(task.id, todoListId)
    const changeStatusHandler = (e: ChangeEvent<HTMLInputElement>) =>
      changeTaskStatus(task.id, e.currentTarget.checked, todoListId)
    const changeTaskTitleHandler = (newTitle: string) => {
      changeTaskTitle(task.id, todoListId, newTitle)
    }
    return (
      <ListItem key={task.id}>
        <input
          type="checkbox"
          checked={task.isDone}
          onChange={changeStatusHandler}
        />
        <EditableSpan title={task.title} changeTitle={changeTaskTitleHandler} />
        <IconButton  size={'small'} onClick={remove}>
            <DeleteForeverIcon />
        </IconButton>
      </ListItem>
    )
  })

  return (
    <div>
      <h3>
        <EditableSpan title={title} changeTitle={changeTitle} />
        <IconButton  size={'small'} onClick={() => removeTodoList(todoListId)}>
          <DeleteForeverIcon />
        </IconButton>
      </h3>

      <AddTaskForm
        addItem={addTaskHandler}
        placeHolder={"Title"}
      />
      <List>{tasksListItems}</List>
      <div className={s.filterButtonsContainer}>
        <Button
          variant="contained"
          disableElevation
          color={filter === "all" ?'warning' : 'primary'}
          onClick={onClickHandlerCreator("all")}
        >
          All
        </Button>
        <Button
          variant="contained"
          disableElevation
          color={filter === "active" ? 'warning' : 'primary'}
          onClick={onClickHandlerCreator("active")}
        >
          Active
        </Button>
        <Button
          variant="contained"
          color={filter === "completed" ? 'warning' : 'primary'}
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
