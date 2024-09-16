import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Message {
  messageType: string;
  message: string;
}

type TodoItem = {
  id: string;
  title: string;
  description: string;
  isCompleted: boolean;
  completedOn?: string;
  createdOn?: string;
};

type AllTasks = {
  tasks: TodoItem[];
};

type UserRecord = {
  [key: string]: AllTasks;
};

type AppState = {
  isDarkMode: boolean;
  userRecords: UserRecord;
  message: Message;
};

const initialState: AppState = {
  isDarkMode: true,
  userRecords: {},
  message: {
    messageType: "",
    message: "",
  },
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setAppMode: (state) => {
      state.isDarkMode = !state.isDarkMode;
    },
    setMessage: (state, action: PayloadAction<Message>) => {
      state.message = action.payload;
    },

    addTodo: (
      state,
      action: PayloadAction<{ items: TodoItem; currentUserId: string }>
    ) => {
      const { items, currentUserId } = action.payload;

      if (!state.userRecords[currentUserId]) {
        state.userRecords[currentUserId] = {
          tasks: [],
        };
      }

      state.userRecords[currentUserId].tasks?.push(items);
    },

    editTodo: (
      state,
      action: PayloadAction<{ items: TodoItem; currentUserId: string }>
    ) => {
      const { items, currentUserId } = action.payload;

      const taskIndex = state.userRecords[currentUserId].tasks.findIndex(
        (task) => task.id === items.id
      );

      state.userRecords[currentUserId].tasks[taskIndex] = items;
    },

    deleteTodo: (
      state,
      action: PayloadAction<{ taskId: string; currentUserId: string }>
    ) => {
      const { taskId, currentUserId } = action.payload;

      const taskIndex = state.userRecords[currentUserId].tasks.findIndex(
        (task) => task.id === taskId
      );

      if (taskIndex !== -1) {
        state.userRecords[currentUserId].tasks.splice(taskIndex, 1);
      }
    },
  },
});

export const appReducer = appSlice.reducer;
export const { setAppMode, setMessage, addTodo, editTodo, deleteTodo } =
  appSlice.actions;
