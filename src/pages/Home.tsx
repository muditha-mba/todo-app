import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../styles/pages/home.scss";
import TodoListItem from "../components/todo/TodoListItem";
import TodoEditWindow from "../components/todo/TodoFormWindow";
import Header from "../components/header/Header";
import { RootState } from "../store/store";
import {
  addTodo,
  deleteTodo,
  completeTodo,
  incompleteTodo,
  updateTodo,
  addUserRecord,
} from "../store/reducers/appSlice";
import TodoAddItemsForm from "../components/todo/TodoAddItemsForm";
import TodoTabs from "../components/todo/TodoTabs";

type TodoItem = {
  id: string;
  title: string;
  description: string;
  completedOn?: string;
};

const Home: React.FC = () => {
  const dispatch = useDispatch();
  const userEmail = useSelector(
    (state: RootState) => state.auth.auth.currentUserId
  );
  const userRecords = useSelector((state: RootState) => state.app.userRecords);
  const { incomplete = [], completed = [] } = userRecords[userEmail] || {};

  const [isCompleteScreen, setIsCompleteScreen] = useState<boolean>(false);
  const [newTitle, setNewTitle] = useState<string>("");
  const [newDescription, setNewDescription] = useState<string>("");
  const [currentEdit, setCurrentEdit] = useState<number | null>(null);
  const [currentEditedItem, setCurrentEditedItem] = useState<TodoItem | null>(
    null
  );
  const [editCompletedIndex, setEditCompletedIndex] = useState<number | null>(
    null
  );

  useEffect(() => {
    if (!userRecords[userEmail]) {
      dispatch(addUserRecord(userEmail));
    }
  }, [dispatch, userEmail, userRecords]);

  const handleAddTodo = () => {
    if (newTitle && newDescription) {
      const newTodoItem: TodoItem = {
        id: new Date().getTime().toString(), // Unique ID
        title: newTitle,
        description: newDescription,
      };
      dispatch(addTodo({ email: userEmail, todo: newTodoItem }));
      setNewTitle("");
      setNewDescription("");
    }
  };

  const handleDeleteTodo = (id: string) => {
    dispatch(deleteTodo({ email: userEmail, id }));
  };

  const handleComplete = (id: string) => {
    dispatch(completeTodo({ email: userEmail, id }));
  };

  const handleIncomplete = (id: string) => {
    dispatch(incompleteTodo({ email: userEmail, id }));
  };

  const handleEdit = (index: number, item: TodoItem) => {
    setCurrentEdit(index);
    setCurrentEditedItem(item);
  };

  const handleEditCompleted = (index: number, item: TodoItem) => {
    setEditCompletedIndex(index);
    setCurrentEditedItem(item);
  };

  const handleUpdateTitle = (value: string) => {
    setCurrentEditedItem((prev) => {
      if (prev) {
        return { ...prev, title: value };
      }
      return prev;
    });
  };

  const handleUpdateDescription = (value: string) => {
    setCurrentEditedItem((prev) => {
      if (prev) {
        return { ...prev, description: value };
      }
      return prev;
    });
  };

  const handleUpdateToDo = () => {
    if (currentEdit !== null && currentEditedItem) {
      dispatch(
        updateTodo({
          email: userEmail,
          id: currentEditedItem.id,
          updatedItem: currentEditedItem,
        })
      );
      setCurrentEdit(null);
      setCurrentEditedItem(null);
    }
  };

  const handleUpdateCompletedToDo = () => {
    if (editCompletedIndex !== null && currentEditedItem) {
      dispatch(
        updateTodo({
          email: userEmail,
          id: currentEditedItem.id,
          updatedItem: currentEditedItem,
        })
      );
      setEditCompletedIndex(null);
      setCurrentEditedItem(null);
    }
  };

  const handleCloseWindow = () => {
    setCurrentEdit(null);
    setEditCompletedIndex(null);
    setCurrentEditedItem(null);
  };

  return (
    <div className="home">
      <Header />

      <div className="todo-wrapper">
        <TodoAddItemsForm
          newTitle={newTitle}
          setNewTitle={setNewTitle}
          newDescription={newDescription}
          setNewDescription={setNewDescription}
          handleAddTodo={handleAddTodo}
        />

        <TodoTabs
          isCompleteScreen={isCompleteScreen}
          setIsCompleteScreen={setIsCompleteScreen}
        />

        <div className="todo-list">
          {!isCompleteScreen &&
            incomplete.map((item, index) => {
              if (currentEdit === index) {
                return (
                  <TodoEditWindow
                    key={item.id}
                    index={index}
                    currentEditedItem={currentEditedItem}
                    handleUpdateTitle={(e) => handleUpdateTitle(e.target.value)}
                    handleUpdateDescription={(e) =>
                      handleUpdateDescription(e.target.value)
                    }
                    handleUpdateToDo={handleUpdateToDo}
                    handleCloseWindow={handleCloseWindow}
                  />
                );
              } else {
                return (
                  <TodoListItem
                    key={item.id}
                    item={item}
                    index={index}
                    isCompleteScreen={isCompleteScreen}
                    onClickIncomplete={() => {}}
                    onClickComplete={() => handleComplete(item.id)}
                    onClickDeleteTodo={handleDeleteTodo} // Pass the function directly
                    onClickEdit={() => handleEdit(index, item)}
                  />
                );
              }
            })}

          {isCompleteScreen &&
            completed.map((item, index) => {
              if (editCompletedIndex === index) {
                return (
                  <TodoEditWindow
                    key={item.id}
                    index={index}
                    currentEditedItem={currentEditedItem}
                    handleUpdateTitle={(e) => handleUpdateTitle(e.target.value)}
                    handleUpdateDescription={(e) =>
                      handleUpdateDescription(e.target.value)
                    }
                    handleUpdateToDo={handleUpdateCompletedToDo}
                    handleCloseWindow={handleCloseWindow}
                  />
                );
              } else {
                return (
                  <TodoListItem
                    key={item.id}
                    item={item}
                    index={index}
                    isCompleteScreen={isCompleteScreen}
                    onClickIncomplete={() => handleIncomplete(item.id)}
                    onClickComplete={() => {}}
                    onClickDeleteTodo={handleDeleteTodo} // Pass the function directly
                    onClickEdit={() => handleEditCompleted(index, item)}
                  />
                );
              }
            })}
        </div>
      </div>
    </div>
  );
};

export default Home;
