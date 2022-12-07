import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType, TaskType} from './App';


type PropsType = {
    title: string
    tasks: TaskType[]
    filter: string
    removeTask: (id: string) => void
    addTask: (title: string) => void
    changeTodoListFilter: (nextFilterValue: FilterValuesType) => void
    changeIsDoneStatus: (taskId: string, status: boolean) => void
}

export function TodoList({title, filter, tasks, removeTask, addTask, changeTodoListFilter, changeIsDoneStatus}: PropsType) {
    // State
    const [taskTitle, setTaskTitle] = useState<string>('')

    // Fn
    const addTaskHandler = () => {
        if (taskTitle === '') {
            alert('Please fill task title')
            return
        }
        addTask(taskTitle)
        setTaskTitle('')
    }
    const setTitleHandler = (e: ChangeEvent<HTMLInputElement>) => setTaskTitle(e.currentTarget.value)
    const addTaskOnEnterHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            addTaskHandler()
        }
    }
    const onClickHandlerCreator = (filter: FilterValuesType) => {
        return () => changeTodoListFilter(filter)
    }

    // Pre JSX
    const tasksListItems = tasks.map(task => {
        const remove = () => removeTask(task.id)
        const changeStatus = (e: ChangeEvent<HTMLInputElement>) => changeIsDoneStatus(task.id, e.currentTarget.checked)

        return (
            <li key={task.id}>
                <input
                    type="checkbox"
                    checked={task.isDone}
                    onChange={changeStatus}
                />
                <span>{task.title}</span>
                <button onClick={remove}>X</button>
            </li>
        )
    })

    return <div>
        <h3>{title}</h3>
        <div>
            <input
                onKeyDown={addTaskOnEnterHandler}
                onChange={setTitleHandler}
                value={taskTitle}
            />
            <button onClick={addTaskHandler}>+
            </button>
        </div>
        <ul>
            {/*{tasks.map(el => {*/}
            {/*    return (*/}
            {/*        <li key={el.id}>*/}
            {/*            <button onClick={() => removeTask(el.id)}>X</button>*/}
            {/*            <input*/}
            {/*                type="checkbox"*/}
            {/*                onChange={(e) => changeIsDoneStatus(el.id, e.currentTarget.checked)}*/}
            {/*                checked={el.isDone}*/}
            {/*            />*/}
            {/*            <span>{el.title}</span>*/}
            {/*        </li>*/}
            {/*    )*/}
            {/*})}*/}
            {tasksListItems}
        </ul>
        <div>
            <button onClick={onClickHandlerCreator('all')}>All</button>
            <button onClick={onClickHandlerCreator('active')}>Active</button>
            <button onClick={onClickHandlerCreator('completed')}>Completed</button>
        </div>
    </div>
}
