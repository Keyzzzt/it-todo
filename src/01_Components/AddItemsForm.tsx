import React, {ChangeEvent, KeyboardEvent, useState} from "react"
import s from './styles.module.css'

type PropsType = {
    buttonTitle: string
    placeHolder: string
    addItem: (title: string) => void

}

export function AddItemsForm({buttonTitle, placeHolder, addItem}: PropsType) {
    /**
     * ! State */
    const [title, setTitle] = useState<string>("")
    const [error, setError] = useState<boolean>(false)

    /**
     * ! Fn */
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
    /**
     * ! JSX */
    return (
        <div>
            <input
                onKeyDown={onEnter}
                onChange={setTitleHandler}
                value={title}
                className={error ? s.errorInput : undefined}
                placeholder={placeHolder}
            />
            <button onClick={onClickAddItem}>{buttonTitle}</button>
            {error && <div className={s.errorMessage}>Please enter title!</div>}
        </div>
    )
}
