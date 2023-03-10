import { Task } from "./Task"
import { action } from "@storybook/addon-actions"

export default {
  title: "Task Component",
  component: Task,
}

const changeTaskStatusCallback = action("Task status changed")
const changeTaskTitleCallback = action("Task title changed")
const removeTaskCallback = action("Task removed")

export const TaskBaseExample = () => {
  return (
    <>
      <Task
        task={{ id: "12", isDone: false, title: "Create web site" }}
        todolistId={"1"}
        removeTask={removeTaskCallback}
        changeTaskTitle={changeTaskTitleCallback}
        changeTaskStatus={changeTaskStatusCallback}
      />
      <Task
        task={{ id: "11", isDone: false, title: "Create final project design" }}
        todolistId={"2"}
        removeTask={removeTaskCallback}
        changeTaskTitle={changeTaskTitleCallback}
        changeTaskStatus={changeTaskStatusCallback}
      />
    </>
  )
}
