import { App } from "./App"
import { action } from "@storybook/addon-actions"
import { Provider } from "react-redux"
import { store } from "./store/store"

export default {
  title: "App Component",
  component: App,
}

// const changeTaskTitleCallback = action("Task title changed")

export const AppBaseExample = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  )
}
