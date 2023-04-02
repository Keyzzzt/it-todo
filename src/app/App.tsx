import { FC, useCallback, useEffect } from 'react'
import { AppBar, Button, Container, Grid, IconButton, LinearProgress, Toolbar, Typography } from '@mui/material'
import { Menu } from '@mui/icons-material'
import { createTodolist, fetchTodolists } from '../store/reducers/reducers/todoListsReducer'
import { useDispatch, useSelector } from 'react-redux'
import { StateType } from '../store/store'
import { ErrorSnackbar } from '../01_Components/ErrorSnackbar/ErrorSnackbar'
import { AppStateType } from './appReducer'
import { TodolistsList } from '../01_Components/TodoList/TodolistsList/TodolistsList'
import { AddItemForm } from '../01_Components/AddItemForm/AddItemForm'

type AppProps = {
  demo?: boolean
}
export const App: FC<AppProps> = ({ demo = false }) => {
  // console.log('App   render')
  const { status, error } = useSelector<StateType, AppStateType>((state) => state.app)
  const dispatch = useDispatch()

  const addTodoList = useCallback(
    (title: string) => {
      dispatch(createTodolist(title))
    },
    [dispatch]
  )

  return (
    <div className="App">
      <ErrorSnackbar />
      <AppBar position="static">
        <Toolbar style={{ justifyContent: 'space-between' }}>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <Menu />
          </IconButton>
          <Typography variant="h6">To do list</Typography>
          <Button color="inherit" variant="outlined">
            Login
          </Button>
        </Toolbar>
      </AppBar>
      {status === 'loading' && <LinearProgress />}
      <Container fixed style={{ paddingTop: '30px' }}>
        <Grid container style={{ paddingTop: '30px' }} spacing={4}>
          <AddItemForm addItem={addTodoList} placeHolder={'Add new todo list'} />
        </Grid>
        <Grid container style={{ paddingTop: '30px' }} spacing={4}>
          <TodolistsList demo={demo} />
        </Grid>
      </Container>
    </div>
  )
}
