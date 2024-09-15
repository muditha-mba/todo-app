import React from "react";
import "../../styles/components/todo/todoFormWindow.scss";
import NormalButton from "../ui/buttons/NormalButton";
import NormalInput from "../ui/inputs/NormalInput";

type TodoItem = {
  id: string;
  title: string;
  description: string;
  completedOn?: string;
};

type Props = {
  index: number;
  currentEditedItem: TodoItem | null;
  handleUpdateTitle: (title: React.ChangeEvent<HTMLInputElement>) => void;
  handleUpdateDescription: (
    description: React.ChangeEvent<HTMLInputElement>
  ) => void;
  handleUpdateToDo: () => void;
  handleCloseWindow: () => void;
};

function TodoEditWindow({
  index,
  currentEditedItem,
  handleUpdateTitle,
  handleUpdateDescription,
  handleUpdateToDo,
  handleCloseWindow,
}: Props) {
  return (
    <div className="todoFormWindow" key={index}>
      <div className="todoFormWindow__inputs">
        <NormalInput
          id="todo-edit-window-title"
          innerPlaceholder="Enter Title"
          value={currentEditedItem?.title || ""}
          type="text"
          changeListeners={[
            (e: React.ChangeEvent<HTMLInputElement>) => handleUpdateTitle(e),
          ]}
          placeholder="Updated Title"
        />
        <NormalInput
          id="todo-edit-window-description"
          value={currentEditedItem?.description || ""}
          type="text"
          innerPlaceholder="Enter Description"
          changeListeners={[
            (e: React.ChangeEvent<HTMLInputElement>) =>
              handleUpdateDescription(e),
          ]}
          placeholder="Updated Description"
        />
      </div>

      <div className="todoFormWindow__button">
        <NormalButton onClick={handleUpdateToDo} value="Update" />
        <NormalButton onClick={handleCloseWindow} value="Close" />
      </div>
    </div>
  );
}

export default TodoEditWindow;
