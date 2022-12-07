import React, {useEffect, useState} from 'react';
import './App.css';
import {TodoList} from './Todolist';
import {v1} from 'uuid'

// C - create (validation)
// R - read (pagination, sorting, filtration)
// U - update (validation)
// D - delete (validation)

const tasks = [
    {id: v1(), title: 'HTML&CSS', isDone: true},
    {id: v1(), title: 'JS', isDone: true},
    {id: v1(), title: 'ReactJS', isDone: false}
]

export type FilterValuesType = 'all' | 'active' | 'completed'
export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export function App() {
    // State
    const todoListTitle: string = 'What to learn'
    const [tasksForRender, setTasksForRender] = useState<TaskType[]>(tasks)
    const [filter, setFilter] = useState<FilterValuesType>('all')
    // Fn
    const removeTask = (id: string): void => {
        setTasksForRender(tasksForRender.filter(el => el.id !== id))
    }
    const addTask = (title: string): void => {
        const newTask: TaskType = {
            id: v1(),
            title,
            isDone: false
        }
        setTasksForRender([...tasksForRender, newTask])
    }
    const changeTodoListFilter = (nextFilter: FilterValuesType) => {
        setFilter(nextFilter)
    }

    const changeIsDoneStatus = (id: string, newStatus: boolean) => {
        // setTasksForRender(tasksForRender.map(task => task.id === id ? {...task, isDone: !task.isDone} : task))
        setTasksForRender(tasksForRender.map((task: TaskType)  => {
            if(task.id === id) {
                return {...task, isDone: newStatus}
            } else {
                return task
            }
        }))
    }

    const getFilteredTasks = (tasks: TaskType[], filter: FilterValuesType): TaskType[] => {
        switch (filter) {
            case "completed":
                return tasks.filter(task => task.isDone)
            case "active":
                return tasks.filter(task => !task.isDone)
            default:
                return tasks
        }
    }

    useEffect(()=> {
        if(filter === 'active') {
            setTasksForRender(tasks.filter(task => !task.isDone))
        } else if (filter === 'completed'){
            setTasksForRender(tasks.filter(task => task.isDone))
        } else {
            setTasksForRender([...tasks])
        }

    }, [filter])

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
    );
}