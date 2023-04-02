import { FC, useCallback } from 'react'
import { Grid, Paper } from '@mui/material'
import { TodoList } from '../Todolist'
import { actions, changeTodolistTitle, deleteTodolist, fetchTodolists, FilterValuesType, TodoListDomainType } from '../../../store/reducers/reducers/todoListsReducer'
import { TasksStatuses } from '../../../todolists.api'
import { createTask, deleteTask, TasksStateType, updateTask } from '../../../store/reducers/reducers/tasksReducer'
import { useDispatch, useSelector } from 'react-redux'
import { StateType } from '../../../store/store'
import { useEffect } from 'react'

type TodolistsListProps = {
  demo?: boolean
}

export const TodolistsList: FC<TodolistsListProps> = ({ demo }) => {
  const dispatch = useDispatch()
  const tasks = useSelector<StateType, TasksStateType>((state) => state.tasks)
  const todolists = useSelector<StateType, Array<TodoListDomainType>>((state) => state.todos)
  useEffect(() => {
    if (demo) return
    dispatch(fetchTodolists())
  }, [dispatch, demo])

  const addTask = useCallback(
    (taskId: string, title: string) => {
      dispatch(createTask(taskId, title))
    },
    [dispatch]
  )
  const removeTask = useCallback(
    (taskId: string, todoListId: string): void => {
      dispatch(deleteTask(todoListId, taskId))
    },
    [dispatch]
  )

  const removeTodoList = useCallback(
    (todoListId: string) => {
      dispatch(deleteTodolist(todoListId))
    },
    [dispatch]
  )
  const changeTodoListFilter = useCallback(
    (nextFilter: FilterValuesType, todoListId: string) => {
      dispatch(actions.setTodoListFilter(todoListId, nextFilter))
    },
    [dispatch]
  )
  const changeTodoListTitleHandler = useCallback(
    (newTitle: string, todoListId: string): void => {
      dispatch(changeTodolistTitle(todoListId, newTitle))
    },
    [dispatch]
  )
  const updateTaskStatusHandler = useCallback(
    (todoListId: string, taskId: string, status: TasksStatuses): void => {
      dispatch(updateTask(todoListId, taskId, { status }))
    },
    [dispatch]
  )
  const updateTaskTitleHandler = useCallback(
    (taskId: string, todoListId: string, title: string) => {
      dispatch(updateTask(todoListId, taskId, { title }))
    },
    [dispatch]
  )
  return (
    <>
      {todolists.length &&
        todolists.map((t) => (
          <Grid item key={t.id}>
            <Paper elevation={8} style={{ padding: '20px' }}>
              <TodoList
                demo={demo}
                todoList={t}
                tasks={tasks[t.id]}
                addTask={addTask}
                removeTask={removeTask}
                changeTaskTitle={updateTaskTitleHandler}
                changeTaskStatus={updateTaskStatusHandler}
                removeTodoList={removeTodoList}
                changeTodoListFilter={changeTodoListFilter}
                changeTodoListTitle={changeTodoListTitleHandler}
              />
            </Paper>
          </Grid>
        ))}
    </>
  )
}
