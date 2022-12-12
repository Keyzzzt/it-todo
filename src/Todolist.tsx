import React, { ChangeEvent, KeyboardEvent, useState } from "react"
import { AddItemsForm } from "./AddItemsForm"
import { FilterValuesType, TaskType } from "./App"

type PropsType = {
  id: string
  title: string
  tasks: TaskType[]
  filter: string
  addTask: (title: string, removeTodoList: string) => void
  removeTask: (id: string, removeTodoList: string) => void
  removeTodoList: (todoListId: string) => void
  changeFilter: (
    nextFilterValue: FilterValuesType,
    removeTodoList: string
  ) => void
  changeStatus: (
    taskId: string,
    status: boolean,
    removeTodoList: string
  ) => void
}

export function TodoList({
  id,
  title,
  filter,
  tasks,
  removeTask,
  removeTodoList,
  addTask,
  changeFilter,
  changeStatus,
}: PropsType) {
  // State

  /**
   * ! Fn*/
  const addItem = (title: string) => {}
  const onClickHandlerCreator = (filter: FilterValuesType) => {
    return () => changeFilter(filter, id)
  }
  const addTaskHandler = () => {
    if (taskTitle === "") {
      alert("Please fill task title")
      return
    }
    addTask(taskTitle.trim(), id)
    setTaskTitle("")
  }

  // JSX as variable
  const tasksListItems = tasks.map((task) => {
    const remove = () => removeTask(task.id, id)
    const changeStatusHandler = (e: ChangeEvent<HTMLInputElement>) =>
      changeStatus(task.id, e.currentTarget.checked, id)

    return (
      <li key={task.id}>
        <input
          type="checkbox"
          checked={task.isDone}
          onChange={changeStatusHandler}
        />
        <span>{task.title}</span>
        <button onClick={remove}>X</button>
      </li>
    )
  })

  return (
    <div>
      <h3>
        {title}
        <button onClick={() => removeTodoList(id)}>Remove List</button>
      </h3>
      <AddItemsForm addItem={addItem} />
      <ul>{tasksListItems}</ul>
      <div>
        <button onClick={onClickHandlerCreator("all")}>All</button>
        <button onClick={onClickHandlerCreator("active")}>Active</button>
        <button onClick={onClickHandlerCreator("completed")}>Completed</button>
      </div>
    </div>
  )
}
