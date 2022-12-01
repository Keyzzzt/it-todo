import React, {MouseEventHandler} from 'react';

type TaskType = {
    id: number
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeItem: (id: number) => void
    filterTasks: (flag: string) => void
}

export function Todolist(props: PropsType) {

        return <div>
        <h3>{props.title}</h3>
        <div>
            <input/>
            <button>+</button>
        </div>
        <ul>
            {props.tasks.map(el => {
                return (
                    <li key={el.id}>
                        <button onClick={() => props.removeItem(el.id)}>X</button>
                        <input type="checkbox" checked={el.isDone}/>
                        <span>{el.title}</span>
                    </li>
                )
            })}

        </ul>
        <div>
            <button onClick={() =>{props.filterTasks('all')}}>All</button>
            <button onClick={() =>{props.filterTasks('active')}}>Active</button>
            <button onClick={() =>{props.filterTasks('completed')}}>Completed</button>
        </div>
    </div>
}
