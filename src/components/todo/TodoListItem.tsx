import "../../styles/components/todo/todoListItem.scss";
import CustomSVGs from "../abstracts/CustomSVGs";

type TodoItem = {
  id: string;
  title: string;
  description: string;
  completedOn?: string;
};

type Props = {
  isCompleteScreen: boolean;
  item: TodoItem;
  index: number;
  onClickDeleteTodo: (id: string) => void;
  onClickComplete: (id: string) => void;
  onClickIncomplete: (id: string) => void;
  onClickEdit: (index: number, item: TodoItem) => void;
};

function TodoListItem({
  isCompleteScreen,
  item,
  index,
  onClickDeleteTodo,
  onClickComplete,
  onClickIncomplete,
  onClickEdit,
}: Props) {
  return (
    <div className="todoListItem">
      <div className="todoListItem__details">
        <h3>{item.title}</h3>
        <p>{item.description}</p>
        {item.completedOn && (
          <p>
            <small>Completed on: {item.completedOn}</small>
          </p>
        )}
      </div>

      <div className="todoListItem__controls">
        {isCompleteScreen && (
          <div
            onClick={() => onClickIncomplete(item.id)}
            title="Mark as incomplete"
            className="todoListItem__controls--icon todoListItem__controls--icon-incomplete"
          >
            <CustomSVGs svgName="crossSVG" />
          </div>
        )}
        {!isCompleteScreen && (
          <div
            onClick={() => onClickComplete(item.id)}
            title="Mark as completed"
            className="todoListItem__controls--icon todoListItem__controls--icon-complete"
          >
            <CustomSVGs svgName="tickSVG" />
          </div>
        )}
        <div
          onClick={() => onClickEdit(index, item)}
          title="Edit"
          className="todoListItem__controls--icon todoListItem__controls--icon-edit"
        >
          <CustomSVGs svgName="editSVG" />
        </div>
        <div
          onClick={() => onClickDeleteTodo(item.id)}
          title="Delete"
          className="todoListItem__controls--icon todoListItem__controls--icon-delete"
        >
          <CustomSVGs svgName="trashSVG" />
        </div>
      </div>
    </div>
  );
}

export default TodoListItem;
