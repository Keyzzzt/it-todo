import { BaseThunkType, InferActionTypes } from '../01_Base'

type ThunkType = BaseThunkType<ActionType>
type ActionType = InferActionTypes<typeof actions>

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type AppStateType = {
  status: RequestStatusType
  error: string
}
const initialState: AppStateType = {
  status: 'idle',
  error: '',
}
export const appReducer = (state: AppStateType = initialState, action: ActionType): AppStateType => {
  switch (action.type) {
    case 'APP/SET-STATUS': {
      return { ...state, status: action.payload.status }
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
