import React, {useState, KeyboardEvent} from 'react';

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
            ? <input onBlur={offEditMode}
                     onChange={(e) => setTitle(e.currentTarget.value)}
                     onKeyDown={onEnter}
                     value={title}
            autoFocus
            />
            : <span onDoubleClick={onEditMode}>{title}</span>
    );
};

