import React, {useState} from 'react';
import './App.css';
import {TodoList} from './Todolist';
import {v1} from 'uuid'

// C - create (validation)
// R - read (pagination, sorting, filtration)
// U - update (validation)
// D - delete (validation)

export type FilterValuesType = 'all' | 'active' | 'completed'
export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export function App() {
    // State
    const todoListTitle: string = 'What to learn'
    const [tasksForRender, setTasksForRender] = useState<TaskType[]>([
        {id: v1(), title: 'HTML&CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'ReactJS', isDone: false}
    ])
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
        setTasksForRender(tasksForRender.map((task: TaskType)  => {
            if(task.id === id) {
                return {...task, isDone: newStatus}
            } else {
                return task
            }
        }))
        // Shorter
        // setTasksForRender(tasksForRender.map(task => task.id === id ? {...task, isDone: !task.isDone} : task))
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