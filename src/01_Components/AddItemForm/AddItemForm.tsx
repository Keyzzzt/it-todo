import { ChangeEvent, KeyboardEvent, useState, memo } from "react"
import s from "./styles.module.css"
import { IconButton, TextField } from "@mui/material"
import { AddBoxOutlined } from "@mui/icons-material"

type PropsType = {
  placeHolder: string
  addItem: (title: string) => void
}

export const AddItemForm = memo(({ placeHolder, addItem }: PropsType) => {
  console.log("AddItemForm   render")

  const [title, setTitle] = useState<string>("")
  const [error, setError] = useState<boolean>(false)

  const setTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
    error && setError(false)
    setTitle(e.currentTarget.value)
  }
  const onClickAddItem = () => {
    if (title.trim()) {
      addItem(title)
      setTitle("")
    } else {
      setError(true)
    }
  }

  const onEnter = (e: KeyboardEvent<HTMLInputElement>) =>
    e.key === "Enter" && onClickAddItem()

  return (
    <div>
      <TextField
        onKeyDown={onEnter}
        onChange={setTitleHandler}
        value={title}
        className={error ? s.errorInput : undefined}
        // Material
        id="outlined-basic"
        label={placeHolder}
        variant="outlined"
        size="small"
        error={error}
        helperText={error && "Task title is required!"}
      />

      <IconButton onClick={onClickAddItem}>
        <AddBoxOutlined />
      </IconButton>
    </div>
  )
})
