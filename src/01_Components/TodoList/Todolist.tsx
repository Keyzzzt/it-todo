import React, {ChangeEvent, KeyboardEvent, useState} from "react"
import {AddItemsForm} from "../AddItemsForm"
import {FilterValuesType, TaskType} from "../../App"
import s from './TodoList.module.css'
import {EditableSpan} from "../EditableSpan/EditableSpan";

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
    changeTodoListTitle: (
        newTitle: string,
        todoListId: string
    ) => void
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
                             changeTaskTitle
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
            <li key={task.id}>
                <input
                    type="checkbox"
                    checked={task.isDone}
                    onChange={changeStatusHandler}
                />
                <EditableSpan title={task.title} changeTitle={changeTaskTitleHandler}/>
                <button onClick={remove}>X</button>
            </li>
        )
    })

    return (
        <div>
            <h3>
                <EditableSpan title={title} changeTitle={changeTitle}/>
                <button onClick={() => removeTodoList(todoListId)}>Remove List</button>
            </h3>
            <AddItemsForm addItem={addTaskHandler} buttonTitle={'Add new task'} placeHolder={'Add new task'}/>
            <ul>{tasksListItems}</ul>
            <div className={s.filterButtonsContainer}>
                <button className={filter === 'all' ? s.activeFilter : ''} onClick={onClickHandlerCreator("all")}>All
                </button>
                <button className={filter === 'active' ? s.activeFilter : ''}
                        onClick={onClickHandlerCreator("active")}>Active
                </button>
                <button className={filter === 'completed' ? s.activeFilter : ''}
                        onClick={onClickHandlerCreator("completed")}>Completed
                </button>
            </div>
        </div>
    )
}
