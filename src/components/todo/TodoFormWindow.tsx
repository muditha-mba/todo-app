import React, { useState } from "react";
import "../../styles/components/todo/todoFormWindow.scss";
import NormalButton from "../ui/buttons/NormalButton";
import NormalInput from "../ui/inputs/NormalInput";
import { TodoItem } from "../../Interfaces/TodoInterfaces";
import { useDispatch } from "react-redux";
import { editTodo } from "../../store/reducers/appSlice";

type Props = {
  currentUserId: string;
  currentEditedItem: TodoItem;
  handleCloseWindow: () => void;
};

function TodoEditWindow({
  currentUserId,
  currentEditedItem,
  handleCloseWindow,
}: Props) {
  const dispatch = useDispatch();
  const [title, setTitle] = useState<string>(currentEditedItem?.title || "");
  const [description, setDescription] = useState<string>(
    currentEditedItem?.description || ""
  );

  const onTaskEditHandler = () => {
    if (!title || !description) {
      return;
    }
    const payload = {
      items: {
        ...currentEditedItem,
        title: title,
        description: description,
      },
      currentUserId,
    };
    dispatch(editTodo(payload));
    handleCloseWindow();
  };

  return (
    <div className="todoFormWindow">
      <div className="todoFormWindow__inputs">
        <NormalInput
          id="todo-edit-window-title"
          innerPlaceholder="Enter Title"
          value={title}
          type="text"
          changeListeners={[
            (e: React.ChangeEvent<HTMLInputElement>) =>
              setTitle(e.target.value),
          ]}
          placeholder="Updated Title"
        />
        <NormalInput
          id="todo-edit-window-description"
          value={description}
          type="text"
          innerPlaceholder="Enter Description"
          changeListeners={[
            (e: React.ChangeEvent<HTMLInputElement>) =>
              setDescription(e.target.value),
          ]}
          placeholder="Updated Description"
        />
      </div>

      <div className="todoFormWindow__button">
        <NormalButton onClick={onTaskEditHandler} value="Update" />
        <NormalButton onClick={handleCloseWindow} value="Close" />
      </div>
    </div>
  );
}

export default TodoEditWindow;
