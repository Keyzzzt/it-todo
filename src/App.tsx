import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';

function App() {
    const tasks = [
        {id: 1, title: 'HTML&CSS', isDone: true},
        {id: 2, title: 'JS', isDone: true},
        {id: 3, title: 'ReactJS', isDone: false}
    ]
    const [tasks1, setTasks1] = useState(tasks)
    const [tasks2, setTasks2] = useState([
        {id: 1, title: 'Hello world', isDone: true},
        {id: 2, title: 'I am Happy', isDone: false},
        {id: 3, title: 'Yo', isDone: false}
    ])
    const [filterKey, setFilterKey] = useState('all')
    const removeItem = (id: number) => {
        setTasks1(tasks1.filter(el => el.id !== id))
    }
    const filterTasks = (flag: string) => {
        if (flag === 'all') {
            setTasks1([...tasks])
        } else if (flag === 'active') {
            setTasks1([...tasks].filter(el => el.isDone))

        } else {
            setTasks1([...tasks].filter(el => el.isDone))


        }
    }

    return (
        <div className="App">
            <Todolist filterTasks={filterTasks} title="What to learn" tasks={tasks1} removeItem={removeItem}/>
            {/*<Todolist title="Songs" tasks={tasks2} removeItem={removeItem}/>*/}
        </div>
    );
}

export default App;
