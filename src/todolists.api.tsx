import axios from 'axios'

const settings = {
    withCredentials: true,
    headers: {
        'API-KEY': '71e6e901-cd3a-49fe-a2c6-dffd513be2ad'
    }
}
const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    ...settings
})

export type TodolistType = {
    id: string,
    title: string,
    addDate: string
    order: number
}
export enum TasksStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3
}
export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    Hi = 2,
    Urgently = 3,
    Later = 4
}
export type TaskType = {
    id: string
    title: string
    description: string | null
    todoListId: string
    order: number
    status: TasksStatuses
    priority: TaskPriorities
    startDate: null | string
    deadline: null | string
    addedDate: string
}
type CreateTodolistDataType = {
    item: TodolistType
}
type CreateAndUpdateTaskType = {
    item: TaskType
}
type ResponseType<D = {}> = {
    resultCode: number
    messages: string[]
    fieldsErrors: string[]
    data: D
}
type GetTasksResponse = {
    totalCount: number
    error: null | string
    items: TaskType[]
}
export type UpdateTaskModelType = {
    title: string
    description: string
    status: number
    priority: number
    startDate: string
    deadline: string
}

export const todolistsApi = {
    getTodolists() {
        return instance
            .get<TodolistType[]>(`todo-lists`)
            .then((res: any) => res.data)
    },
    createTodolist(title: string) {
        return instance
            .post<ResponseType<CreateTodolistDataType>>(`todo-lists`, {title})
            .then((res: any) => res.data)
    },
    deleteTodolist(todolistId: string) {
        return instance
            .delete<ResponseType>(`todo-lists/${todolistId}`)
            .then((res: any) => res.data)
    },
    updateTodolist(todolistId: string, title: string) {
        return instance
            .put<ResponseType>(`todo-lists/${todolistId}`, {title})
            .then((res: any) => res.data)
    },
    getTasks(todolistId: string) {
        return instance
            .get<GetTasksResponse>(`todo-lists/${todolistId}/tasks`)
            .then((res: any) => res.data)
    },
    createTask(todolistId: string, title: string) {
        return instance
            .post<ResponseType<CreateAndUpdateTaskType>>(`todo-lists/${todolistId}/tasks`, {title})
            .then((res: any) => res.data)
    },
    deleteTask(todolistId: string, taskId: string) {
        return instance
            .delete<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`,)
            .then((res: any) => res.data)
    },
    updateTask(todolistId: string, taskId: string, updateData: UpdateTaskModelType) {
        return instance
            .put<ResponseType<CreateAndUpdateTaskType>>(`todo-lists/${todolistId}/tasks/${taskId}`, {...updateData})
            .then((res: any) => res.data)
    },

}