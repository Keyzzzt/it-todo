import { appReducer, actions, AppStateType } from './appReducer'

const startState: AppStateType = {
  status: 'idle',
  error: '',
}

test('Should set status', () => {
  const newStatus = 'failed'
  const endState = appReducer(startState, actions.setStatus(newStatus))
  expect(endState.status).toEqual(newStatus)
})
test('Should set error message', () => {
  const errorMessage = 'Some error occured'
  const endState = appReducer(startState, actions.setError(errorMessage))
  expect(endState.error).toEqual(errorMessage)
})
test('Should reset error message', () => {
  const startState: AppStateType = {
    status: 'idle',
    error: 'Some Error',
  }
  const endState = appReducer(startState, actions.resetError())
  expect(endState.error).toEqual('')
})
