type ActionType = {
    type: 'SUM' | 'SUB' | 'MULT' | 'DIV'
    payload: number
}

export const salaryReducer = (state: number, action: ActionType): number => {
    switch(action.type) {
        case 'SUM':
            return state + action.payload
        case 'SUB':
            return state - action.payload
        case 'MULT':
            return state * action.payload
        case 'DIV':
            return state / action.payload
        default:
            return state
    }

}