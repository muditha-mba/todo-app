import React, { useEffect, useState } from "react";
import "../styles/pages/home.scss";
import Header from "../components/header/Header";
import TodoTabs from "../components/todo/TodoTabs";
import TodoAddItemsForm from "../components/todo/TodoAddItemsForm";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import TodoListItem from "../components/todo/TodoListItem";
import NoData from "../components/abstracts/NoData";
import { TodoItem } from "../Interfaces/TodoInterfaces";

const Home: React.FC = () => {
  const currentUserId = useSelector(
    (state: RootState) => state.auth.auth.currentUserId
  );
  const userRecords = useSelector((state: RootState) => state.app.userRecords);
  const [isCompleteScreen, setIsCompleteScreen] = useState<boolean>(false);
  const [completedTasks, setCompletedTasks] = useState<TodoItem[]>([]);
  const [incompleteTasks, setIncompleteTasks] = useState<TodoItem[]>([]);

  useEffect(() => {
    if (userRecords[currentUserId]) {
      const tasks = userRecords[currentUserId].tasks;
      const completed = tasks.filter((task) => task.isCompleted);
      const inCompleted = tasks.filter((task) => !task.isCompleted);
      setCompletedTasks(completed);
      setIncompleteTasks(inCompleted);
    } else {
      setCompletedTasks([]);
      setIncompleteTasks([]);
    }
  }, [userRecords, currentUserId]);

  return (
    <div className="home">
      <Header />

      <div className="home__todo">
        <TodoAddItemsForm
          currentUserId={currentUserId}
          setIsCompleteScreen={setIsCompleteScreen}
        />

        <TodoTabs
          isCompleteScreen={isCompleteScreen}
          setIsCompleteScreen={setIsCompleteScreen}
        />

        <div className="home__todo--list">
          {/*Rendering incomplete tasks*/}
          {!isCompleteScreen &&
            incompleteTasks.length > 0 &&
            incompleteTasks.map((task, index) => {
              return (
                <TodoListItem
                  key={index}
                  isCompleteScreen={isCompleteScreen}
                  item={task}
                  currentUserId={currentUserId}
                />
              );
            })}

          {/*Rendering completed tasks*/}
          {isCompleteScreen &&
            completedTasks.length > 0 &&
            completedTasks.map((task, index) => {
              return (
                <TodoListItem
                  key={index}
                  isCompleteScreen={isCompleteScreen}
                  item={task}
                  currentUserId={currentUserId}
                />
              );
            })}

          {/* When completed tasks are empty */}
          {isCompleteScreen && completedTasks.length === 0 && (
            <NoData
              title="No Completed Tasks"
              subTitle={"Mark a task as completed to see it here"}
            />
          )}

          {/* When incomplete tasks are empty */}
          {!isCompleteScreen && incompleteTasks.length === 0 && (
            <NoData
              title="No Tasks"
              subTitle={"Add a new tasks to see it here"}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
