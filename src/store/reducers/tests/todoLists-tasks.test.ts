import {tasksReducer, TasksStateType} from '../reducers/tasksReducer'
import {actions, TodoListDomainType, todoListsReducer} from '../reducers/todoListsReducer'
import {TaskPriorities, TasksStatuses} from '../../../todolists.api'


test('Should create new Todolist and new entry for this Todolist in tasks', () => {
    const startTodoListsState: TodoListDomainType[] = []
    const startTasksState = {}
    const title = 'Hola'

    const action = actions.addNewTodoList(title)

    const addNewTodoLIstEndState = todoListsReducer(startTodoListsState, action)
    const addNewTasksEntryEndState = tasksReducer(startTasksState, action)
    const idFromTodo = addNewTodoLIstEndState[0].id
    const idFromTasks = Object.keys(addNewTasksEntryEndState)[0]
    const titleFromTodo = addNewTodoLIstEndState[0].title

    expect(addNewTodoLIstEndState.length).toEqual(1)
    expect(titleFromTodo).toEqual(action.payload.title)

    expect(idFromTodo).toEqual(action.payload.id)
    expect(idFromTodo).toEqual(idFromTasks)
})

test('Should remove TodoList and tasks with same id', () => {
    const id1 = '1'
    const id2 = '2'

    const idToDelete = id1

    const todoStartState: Array<TodoListDomainType> = [
        {id: id1, title: 'What to learn', filter: 'all', addDate: '', order: 0},
        {id: id2, title: 'What to buy', filter: 'active', addDate: '', order: 0},
    ]
    const tasksStartState: TasksStateType = {
        [id1]: [
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
        [id2]: [
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


    const action = actions.removeTodoList(idToDelete)

    const removeTodoEndState = todoListsReducer(todoStartState, action)
    const removeTaskEndState = tasksReducer(tasksStartState, action)
    expect(removeTodoEndState.length).toEqual(1)
    expect(removeTodoEndState.some(el => el.id === idToDelete)).toEqual(false)
    expect(removeTaskEndState[idToDelete]).toEqual(undefined)
})
