import { useState } from "react";
import "../../styles/components/todo/todoAddItemsForm.scss";
import NormalButton from "../ui/buttons/NormalButton";
import NormalInput from "../ui/inputs/NormalInput";
import { useDispatch } from "react-redux";
import { addTodo } from "../../store/reducers/appSlice";

type Props = {
  currentUserId: string;
  setIsCompleteScreen: (value: boolean) => void;
};

const TodoAddItemsForm = ({ currentUserId, setIsCompleteScreen }: Props) => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const dispatch = useDispatch();
  const handleAddTodo = () => {
    if (!title || !description) {
      return;
    }

    const payload = {
      items: {
        id: new Date().getTime().toString(),
        title,
        description,
        isCompleted: false,
        createdOn: new Date().toLocaleString(),
      },
      currentUserId: currentUserId,
    };
    dispatch(addTodo(payload));
    setTitle("");
    setDescription("");
    setIsCompleteScreen(false);
  };

  return (
    <div className="todoAddItemsForm">
      <div className="todoAddItemsForm__inputs">
        <div className="todoAddItemsForm__inputs--title">
          <NormalInput
            id="todo-add-window-title"
            value={title}
            type="text"
            innerPlaceholder="Enter Title"
            changeListeners={[
              (e: React.ChangeEvent<HTMLInputElement>) =>
                setTitle(e.target.value),
            ]}
            placeholder="Task title"
          />
        </div>

        <div className="todoAddItemsForm__inputs--description">
          <NormalInput
            id="todo-add-window-description"
            value={description}
            type="text"
            innerPlaceholder="Enter Description"
            changeListeners={[
              (e: React.ChangeEvent<HTMLInputElement>) =>
                setDescription(e.target.value),
            ]}
            placeholder="Task description"
          />
        </div>
      </div>
      <div className="todoAddItemsForm__button">
        <NormalButton type="button" onClick={handleAddTodo} value="Add Item" />
      </div>
    </div>
  );
};

export default TodoAddItemsForm;
