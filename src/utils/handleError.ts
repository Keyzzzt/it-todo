import { Dispatch } from 'redux'
import { actions } from '../app/appReducer'
import { ServerResponseType } from '../todolists.api'
import { AxiosError } from 'axios'

export const handleServerError = <D>(data: ServerResponseType<D>, dispatch: Dispatch) => {
  if (data.messages.length) {
    dispatch(actions.setError(data.messages[0]))
  } else {
    dispatch(actions.setError('Server error'))
  }
  dispatch(actions.setStatus('failed'))
}
export const handleNetworkError = (error: AxiosError, dispatch: Dispatch) => {
  dispatch(actions.setError(error.message ? error.message : 'Network error'))
  dispatch(actions.setStatus('failed'))
}
