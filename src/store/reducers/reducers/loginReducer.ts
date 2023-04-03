import { BaseThunkType, InferActionTypes } from '../../../01_Base'
import { authAPI } from '../../../todolists.api'
import { actions as appActions } from '../../../app/appReducer'
import { handleNetworkError } from '../../../utils/handleError'
import { handleServerError } from '../../../utils/handleError'
import { AxiosError } from 'axios'

type ThunkType = BaseThunkType<ActionType>
type ActionType = InferActionTypes<typeof actions> | ReturnType<typeof appActions.setStatus>

export type LoginParamsType = {
  email: string
  password: string
  rememberMe: boolean
  captha?: string
}
export type LoginStateType = {
  isLoggedIn: boolean
}

const initialState: LoginStateType = {
  isLoggedIn: false,
}
export const loginReducer = (state: LoginStateType = initialState, action: ActionType): LoginStateType => {
  switch (action.type) {
    case 'LOGIN/SET-ISLOGGEDIN':
      return { ...state, isLoggedIn: action.payload.value }

    default:
      return state
  }
}
export const actions = {
  login: (value: boolean) =>
    ({
      type: 'LOGIN/SET-ISLOGGEDIN',
      payload: { value },
    } as const),
}

export const login = (params: LoginParamsType): ThunkType => {
  return async (dispatch) => {
    try {
      dispatch(appActions.setStatus('loading'))
      const data = await authAPI.login(params)
      if (data.resultCode === 0) {
        dispatch(actions.login(true))
        dispatch(appActions.setStatus('succeeded'))
      } else {
        handleServerError(data, dispatch)
        dispatch(appActions.setStatus('failed'))
      }
    } catch (err) {
      handleNetworkError(err as AxiosError, dispatch)
    }
  }
}

export const logout = (): ThunkType => {
  return async (dispatch) => {
    try {
      dispatch(appActions.setStatus('loading'))
      const data = await authAPI.logout()
      if (data.resultCode === 0) {
        dispatch(appActions.setStatus('succeeded'))
        dispatch(actions.login(false))
      } else {
        handleServerError(data, dispatch)
        dispatch(appActions.setStatus('failed'))
      }
    } catch (err) {
      handleNetworkError(err as AxiosError, dispatch)
    }
  }
}
