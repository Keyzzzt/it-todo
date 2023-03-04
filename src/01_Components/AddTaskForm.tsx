import React, {ChangeEvent, KeyboardEvent, useState} from "react"
import s from './styles.module.css'
import {Button, IconButton, TextField} from "@mui/material";
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import {AddBoxOutlined} from "@mui/icons-material";

type PropsType = {
    placeHolder: string
    addItem: (title: string) => void

}

export function AddTaskForm({placeHolder, addItem}: PropsType) {
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

    const onEnter = (e: KeyboardEvent<HTMLInputElement>) => e.key === "Enter" && onClickAddItem()

    return (
        <div>
            <TextField
                onKeyDown={onEnter}
                onChange={setTitleHandler}
                value={title}
                className={error ? s.errorInput : undefined}
                placeholder={placeHolder}
                // Material
                id="outlined-basic"
                label="Add title"
                variant="outlined"
                size='small'
                error={error}
                helperText={error && 'Task title is required!'}
            />

            <IconButton onClick={onClickAddItem}>
                <AddBoxOutlined />
            </IconButton>
        </div>
    )
}
