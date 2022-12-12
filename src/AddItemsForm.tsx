import { ChangeEvent, KeyboardEvent, useState } from "react"

type PropsType = {
  addItem: (title: string) => void
}

export function AddItemsForm({ addItem }: PropsType) {
    /**
   * ! State */
  const [title, setTitle] = useState<string>("")
  const [error, setError] = useState<boolean>(false)

  /**
   * ! Fn */
  const setTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value)
    setError(false)
  }
  const onClickAddItem = () => {
    if (title.trim()) {
      addItem(title)
    } else {
      setError(true)
    }
    setTitle("")
    setError(false)
  }

  const onEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onClickAddItem()
    }
  }
  /**
   * ! JSX */
  return (
    <div>
      <input
        onKeyDown={onEnter}
        onChange={setTitleHandler}
        value={title}
      />
      <button onClick={onClickAddItem}>+</button>
    </div>
  )
}
