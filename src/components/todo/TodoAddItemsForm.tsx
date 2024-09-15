import "../../styles/components/todo/todoAddItemsForm.scss";
import NormalButton from "../ui/buttons/NormalButton";
import NormalInput from "../ui/inputs/NormalInput";

type Props = {
  newTitle: string;
  setNewTitle: React.Dispatch<React.SetStateAction<string>>;
  newDescription: string;
  setNewDescription: React.Dispatch<React.SetStateAction<string>>;
  handleAddTodo: () => void;
};

const TodoAddItemsForm = ({
  newTitle,
  setNewTitle,
  newDescription,
  setNewDescription,
  handleAddTodo,
}: Props) => {
  return (
    <div className="todoAddItemsForm">
      <div className="todoAddItemsForm__inputs">
        <div className="todoAddItemsForm__inputs--title">
          <NormalInput
            id="todo-add-window-title"
            value={newTitle}
            type="text"
            innerPlaceholder="Enter Title"
            changeListeners={[
              (e: React.ChangeEvent<HTMLInputElement>) =>
                setNewTitle(e.target.value),
            ]}
            placeholder="Task title"
          />
        </div>

        <div className="todoAddItemsForm__inputs--description">
          <NormalInput
            id="todo-add-window-description"
            value={newDescription}
            type="text"
            innerPlaceholder="Enter Description"
            changeListeners={[
              (e: React.ChangeEvent<HTMLInputElement>) =>
                setNewDescription(e.target.value),
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
