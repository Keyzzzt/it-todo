import {salaryReducer} from './tasks'

test('Testing sum function', () => {
        const result = 5
        expect(salaryReducer(20, {type: "SUM", payload: 10})).toBe(30)
        expect(salaryReducer(20, {type: "SUB", payload: 10})).toBe(10)
        expect(salaryReducer(20, {type: "MULT", payload: 10})).toBe(200)
        expect(salaryReducer(20, {type: "DIV", payload: 10})).toBe(2)
})

