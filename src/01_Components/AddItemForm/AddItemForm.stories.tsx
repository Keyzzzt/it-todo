import { AddItemForm } from "./AddItemForm"
import { action } from "@storybook/addon-actions"

export default {
  title: "AddItemForm Component",
  component: AddItemForm,
}

const callback = action("Add button was clicked")

export const AddItemFormBaseExample = () => {
  return <AddItemForm placeHolder="Enter value..." addItem={callback} />
}
