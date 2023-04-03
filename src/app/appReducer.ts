import { AxiosError } from 'axios'
import { BaseThunkType, InferActionTypes } from '../01_Base'
import { authAPI } from '../todolists.api'
import { handleNetworkError, handleServerError } from '../utils/handleError'
import { actions as loginActions } from '../store/reducers/reducers/loginReducer'

type ThunkType = BaseThunkType<ActionType>
type ActionType = InferActionTypes<typeof actions> | ReturnType<typeof loginActions.login>

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type AppStateType = {
  status: RequestStatusType
  error: string
  isInitialized: boolean
}
const initialState: AppStateType = {
  status: 'idle',
  error: '',
  isInitialized: false,
}
export const appReducer = (state: AppStateType = initialState, action: ActionType): AppStateType => {
  switch (action.type) {
    case 'APP/SET-STATUS': {
      return { ...state, status: action.payload.status }
    }
    case 'APP/SET-ISINITIALIZED': {
      return { ...state, isInitialized: action.payload.value }
    }
    case 'APP/SET-ERROR': {
      return { ...state, error: action.payload.error }
    }
    case 'APP/RESET-ERROR': {
      return { ...state, error: '' }
    }

    default:
      return state
  }
}

export const actions = {
  setStatus: (status: RequestStatusType) =>
    ({
      type: 'APP/SET-STATUS',
      payload: { status },
    } as const),
  setIsInitialized: (value: boolean) =>
    ({
      type: 'APP/SET-ISINITIALIZED',
      payload: { value },
    } as const),
  setError: (error: string) =>
    ({
      type: 'APP/SET-ERROR',
      payload: { error },
    } as const),
  resetError: () =>
    ({
      type: 'APP/RESET-ERROR',
    } as const),
}

export const initializeApp = (): ThunkType => {
  return async (dispatch) => {
    try {
      const data = await authAPI.auth()
      if (data.resultCode === 0) {
        // dispatch(actions.login(true))
        dispatch(loginActions.login(true))
      } else {
        handleServerError(data, dispatch)
        dispatch(actions.setStatus('failed'))
      }
    } catch (err) {
      handleNetworkError(err as AxiosError, dispatch)
    }
    dispatch(actions.setIsInitialized(true))
  }
}
