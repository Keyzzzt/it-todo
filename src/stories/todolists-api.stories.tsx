import React, { useEffect, useState } from "react"
import axios from "axios"

export default {
  title: "API",
}
const settings = {
  withCredentials: true,
}

export const GetTodolists = () => {
  const [state, setState] = useState<any>(null)
  useEffect(() => {
    axios
      .get(`https://social-network.samuraijs.com/api/1.1/todo-lists`, settings)
      .then((res: any) => setState(res.data))
  }, [])
  return <pre>{JSON.stringify(state, null, "\t")}</pre>
}
export const CreateTodolist = () => {
  const [state, setState] = useState<any>(null)
  useEffect(() => {
    axios
      .post(
        `https://social-network.samuraijs.com/api/1.1/todo-lists`,
        { title: "First Todolist" },
        settings
      )
      .then((res: any) => setState(res.data))
  }, [])

  return <pre>{JSON.stringify(state, null, "\t")}</pre>
}
export const DeleteTodolist = () => {
  const [state, setState] = useState<any>(null)
  useEffect(() => {
    axios
      .delete(
        `https://social-network.samuraijs.com/api/1.1/todo-lists/c6c49812-0cab-46f4-8cb1-d8f6cefc2d75`,
        settings
      )
      .then((res: any) => setState(res.data))
  }, [])
  return <pre>{JSON.stringify(state, null, "\t")}</pre>
}
export const UpdateTodolistTitle = () => {
  const [state, setState] = useState<any>(null)
  useEffect(() => {
    axios
      .put(
        `https://social-network.samuraijs.com/api/1.1/todo-lists/1057987b-a2e6-42ac-9043-07f58e34e591`,
        { title: "Hello" },
        settings
      )
      .then((res: any) => setState(res.data))
  }, [])

  return <pre>{JSON.stringify(state, null, "\t")}</pre>
}
