import React, {useState, KeyboardEvent} from 'react';
import {TextField} from "@mui/material";

type PropsType = {
    title: string
    changeTitle: (title: string) => void

}
export const EditableSpan = (props: PropsType) => {
    const [isEditMode, setIsEditMode] = useState<boolean>(false)
    const [title, setTitle] = useState<string>(props.title)

    const onEditMode = () => {
        setIsEditMode(true)
    }
    const offEditMode = () => {
        props.changeTitle(title)
        setIsEditMode(false)
    }
    const onEnter = (e: KeyboardEvent<HTMLInputElement>) => e.key === "Enter" && offEditMode()
    return (
        isEditMode
            ? <TextField
                onBlur={offEditMode}
                onChange={(e) => setTitle(e.currentTarget.value)}
                onKeyDown={onEnter}
                value={title}
                // Material
                id="outlined-basic"
                label="Title"
                variant="outlined"
                autoFocus
                size='small'
            />
            : <span onDoubleClick={onEditMode}>{title}</span>
    );
};

