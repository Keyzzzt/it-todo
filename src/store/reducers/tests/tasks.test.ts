import { tasksReducer, actions } from '../reducers/tasksReducer';

const todoLIstId_1 = '87jhg8'
const todoLIstId_2 = '87jhg3'
const startState = {
    [todoLIstId_1]: [
      { id: '1', title: "HTML&CSS", isDone: true },
      { id: '2', title: "JS", isDone: true },
    ],
    [todoLIstId_2]: [
      { id: '1', title: "Toyota oil", isDone: false },
      { id: '2', title: "Glass cans", isDone: false },
      { id: '3', title: "Oil filter", isDone: false },
    ],
  }

test('Tasks Reducer', () => {



      const newTaskTitle = 'Go home'
      const renameTaskTitle = 'Buy a car'
      const removeTaskId = '3'
      const renameTaskId = '1'
      const addTaskEndState = tasksReducer(startState, actions.addNewTask(todoLIstId_1, newTaskTitle))
      const removeTaskEndState = tasksReducer(startState, actions.removeTask(todoLIstId_2, removeTaskId))
      const renameTaskEndState = tasksReducer(startState, actions.renameTask(todoLIstId_2, renameTaskId, renameTaskTitle))

      expect(addTaskEndState[todoLIstId_1].length).toEqual(3)
      expect(addTaskEndState[todoLIstId_1].some(el => el.title === newTaskTitle)).toEqual(true)

      expect(removeTaskEndState[todoLIstId_2].length).toEqual(2)
      expect(removeTaskEndState[todoLIstId_2].some(el => el.id === removeTaskId)).toEqual(false)
      
      expect(renameTaskEndState[todoLIstId_2].some(el => el.title === renameTaskTitle)).toEqual(true)


})