import "../../styles/components/todo/todoListItem.scss";
import CustomSVGs from "../abstracts/CustomSVGs";
import { TodoItem } from "../../Interfaces/TodoInterfaces";
import { useDispatch } from "react-redux";
import { deleteTodo, editTodo } from "../../store/reducers/appSlice";
import { useState } from "react";
import TodoEditWindow from "./TodoFormWindow";

type Props = {
  currentUserId: string;
  isCompleteScreen: boolean;
  item: TodoItem;
};

function TodoListItem({ isCompleteScreen, item, currentUserId }: Props) {
  const dispatch = useDispatch();
  const [isEditWindowOpen, setIsEditWindowOpen] = useState<boolean>(false);

  const openEditWindowHandler = () => {
    setIsEditWindowOpen(true);
  };
  const closeEditWindowHandler = () => {
    setIsEditWindowOpen(false);
  };

  const onTaskDeleteHandler = () => {
    const payload = { taskId: item?.id, currentUserId: currentUserId };
    dispatch(deleteTodo(payload));
  };

  const setTaskCompletedHandler = () => {
    dispatch(
      editTodo({
        items: {
          ...item,
          isCompleted: true,
          completedOn: new Date().toLocaleString(),
        },
        currentUserId,
      })
    );
  };

  const setTaskIncompleteHandler = () => {
    dispatch(
      editTodo({
        items: { ...item, isCompleted: false, completedOn: "" },
        currentUserId,
      })
    );
  };
  return (
    <>
      {isEditWindowOpen ? (
        <TodoEditWindow
          currentEditedItem={item}
          handleCloseWindow={closeEditWindowHandler}
          currentUserId={currentUserId}
        />
      ) : (
        <div className="todoListItem">
          <div className="todoListItem__details">
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            {item.completedOn && isCompleteScreen && (
              <p>
                <small>Completed on: {item.completedOn}</small>
              </p>
            )}
            {item.createdOn && !isCompleteScreen && (
              <p>
                <small>Created on: {item.createdOn}</small>
              </p>
            )}
          </div>

          <div className="todoListItem__controls">
            {isCompleteScreen && (
              <div
                onClick={setTaskIncompleteHandler}
                title="Mark as incomplete"
                className="todoListItem__controls--icon todoListItem__controls--icon-incomplete"
              >
                <CustomSVGs svgName="crossSVG" />
              </div>
            )}
            {!isCompleteScreen && (
              <div
                onClick={setTaskCompletedHandler}
                title="Mark as completed"
                className="todoListItem__controls--icon todoListItem__controls--icon-complete"
              >
                <CustomSVGs svgName="tickSVG" />
              </div>
            )}
            <div
              onClick={openEditWindowHandler}
              title="Edit"
              className="todoListItem__controls--icon todoListItem__controls--icon-edit"
            >
              <CustomSVGs svgName="editSVG" />
            </div>
            <div
              onClick={onTaskDeleteHandler}
              title="Delete"
              className="todoListItem__controls--icon todoListItem__controls--icon-delete"
            >
              <CustomSVGs svgName="trashSVG" />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default TodoListItem;
