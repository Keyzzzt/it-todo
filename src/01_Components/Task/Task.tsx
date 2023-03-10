import { memo, FC } from "react"
import { EditableSpan } from "./../EditableSpan/EditableSpan"
import { IconButton, ListItem } from "@mui/material"
import DeleteForeverIcon from "@mui/icons-material/DeleteForever"
import { TaskType } from "../../store/reducers/reducers/tasksReducer"

type TaskProps = {
  task: TaskType
  todolistId: string
  changeTaskStatus: (
    status: boolean,
    taskId: string,
    removeTodoList: string
  ) => void
  changeTaskTitle: (taskId: string, todoListId: string, title: string) => void
  removeTask: (id: string, todoListId: string) => void
}

export const Task: FC<TaskProps> = memo(
  ({ task, todolistId, changeTaskStatus, changeTaskTitle, removeTask }) => {
    const changeTitleHandler = (newTitle: string) => {
      changeTaskTitle(task.id, todolistId, newTitle)
    }
    return (
      <ListItem key={task.id}>
        <input
          type="checkbox"
          checked={task.isDone}
          onChange={(e) =>
            changeTaskStatus(e.target.checked, task.id, todolistId)
          }
        />
        <EditableSpan title={task.title} changeTitle={changeTitleHandler} />
        <IconButton
          size={"small"}
          onClick={() => removeTask(task.id, todolistId)}
        >
          <DeleteForeverIcon />
        </IconButton>
      </ListItem>
    )
  }
)
