import {tasksReducer, actions} from '../reducers/tasksReducer'
import {TaskPriorities, TasksStatuses} from '../../../todolists.api'

const todoLIstId_1 = '87jhg8'
const todoLIstId_2 = '87jhg3'
const startState = {
    [todoLIstId_1]: [
        {
            id: '2w',
            title: 'HTML&CSS',
            status: TasksStatuses.New,
            addedDate: '',
            deadline: '',
            order: 0,
            startDate: '',
            todoListId: '1',
            description: '',
            priority: TaskPriorities.Hi
        },
        {
            id: '5t',
            title: 'JS',
            status: TasksStatuses.Completed,
            addedDate: '',
            deadline: '',
            order: 0,
            startDate: '',
            todoListId: '1',
            description: '',
            priority: TaskPriorities.Low
        },
    ],
    [todoLIstId_1]: [
        {
            id: '1p',
            title: 'Toyota oil',
            status: TasksStatuses.New,
            addedDate: '',
            deadline: '',
            order: 0,
            startDate: '',
            todoListId: '1',
            description: '',
            priority: TaskPriorities.Later
        },
        {
            id: 'o0l',
            title: 'Glass cans',
            status: TasksStatuses.Completed,
            addedDate: '',
            deadline: '',
            order: 0,
            startDate: '',
            todoListId: '1',
            description: '',
            priority: TaskPriorities.Hi
        },
    ],
}

// test('Tasks Reducer', () => {
//       const newTaskTitle = 'Go home'
//       const renameTaskTitle = 'Buy a car'
//       const removeTaskId = '3'
//       const renameTaskId = '1'
//       const addTaskEndState = tasksReducer(startState, actions.addNewTask(todoLIstId_1, newTaskTitle))
//       const removeTaskEndState = tasksReducer(startState, actions.removeTask(todoLIstId_2, removeTaskId))
//       const renameTaskEndState = tasksReducer(startState, actions.renameTask(todoLIstId_2, renameTaskId, renameTaskTitle))
//       expect(addTaskEndState[todoLIstId_1].length).toEqual(3)
//       expect(addTaskEndState[todoLIstId_1].some(el => el.title === newTaskTitle)).toEqual(true)
//       expect(removeTaskEndState[todoLIstId_2].length).toEqual(2)
//       expect(removeTaskEndState[todoLIstId_2].some(el => el.id === removeTaskId)).toEqual(false)
//       expect(renameTaskEndState[todoLIstId_2].some(el => el.title === renameTaskTitle)).toEqual(true)
// })

test('Should create new task', () => {
    // const newTaskTitle = 'New Task'
    // const endState = tasksReducer({}, actions.addNewTask(todoLIstId_1, newTaskTitle))
    // expect(endState[todoLIstId_1].length).toEqual(1)

})
