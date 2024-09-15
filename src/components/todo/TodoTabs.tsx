import "../../styles/components/todo/todoTabs.scss";

type Props = {
  isCompleteScreen: boolean;
  setIsCompleteScreen: React.Dispatch<React.SetStateAction<boolean>>;
};

function TodoTabs({ isCompleteScreen, setIsCompleteScreen }: Props) {
  return (
    <div className="todoTabs">
      <div
        className={`todoTabs__item todoTabs__inCompleted ${
          !isCompleteScreen && "active"
        }`}
        onClick={() => setIsCompleteScreen(false)}
      >
        Todo
      </div>
      <div
        className={`todoTabs__item todoTabs__completed ${
          isCompleteScreen && "active"
        }`}
        onClick={() => setIsCompleteScreen(true)}
      >
        Completed
      </div>
    </div>
  );
}

export default TodoTabs;
