import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Message {
  messageType: string;
  message: string;
}

type TodoItem = {
  id: string;
  title: string;
  description: string;
  completedOn?: string;
};

type AllTodos = {
  incomplete: TodoItem[];
  completed: TodoItem[];
};

type UserRecord = {
  [key: string]: AllTodos;
};

type AppState = {
  isDarkMode: boolean;
  userRecords: UserRecord;
  message: Message;
};

const initialState: AppState = {
  isDarkMode: false,
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
    setAppMode: (state, action: PayloadAction<boolean>) => {
      state.isDarkMode = action.payload;
    },
    setMessage: (state, action: PayloadAction<Message>) => {
      state.message = action.payload;
    },
    addUserRecord: (state, action: PayloadAction<string>) => {
      const email = action.payload;
      if (!state.userRecords[email]) {
        state.userRecords[email] = { incomplete: [], completed: [] };
      }
    },
    addTodo: (
      state,
      action: PayloadAction<{ email: string; todo: TodoItem }>
    ) => {
      const { email, todo } = action.payload;
      if (!state.userRecords[email]) {
        state.userRecords[email] = { incomplete: [], completed: [] };
      }
      state.userRecords[email].incomplete.push(todo);
    },
    deleteTodo: (
      state,
      action: PayloadAction<{ email: string; id: string }>
    ) => {
      const { email, id } = action.payload;
      if (state.userRecords[email]) {
        state.userRecords[email].incomplete = state.userRecords[
          email
        ].incomplete.filter((todo) => todo.id !== id);

        state.userRecords[email].completed = state.userRecords[
          email
        ].completed.filter((todo) => todo.id !== id);
      }
    },

    completeTodo: (
      state,
      action: PayloadAction<{ email: string; id: string }>
    ) => {
      const { email, id } = action.payload;
      if (state.userRecords[email]) {
        const todo = state.userRecords[email].incomplete.find(
          (todo) => todo.id === id
        );
        if (todo) {
          const completedOn = new Date().toLocaleString();
          state.userRecords[email].completed.push({ ...todo, completedOn });
          state.userRecords[email].incomplete = state.userRecords[
            email
          ].incomplete.filter((todo) => todo.id !== id);
        }
      }
    },
    incompleteTodo: (
      state,
      action: PayloadAction<{ email: string; id: string }>
    ) => {
      const { email, id } = action.payload;
      if (state.userRecords[email]) {
        const todo = state.userRecords[email].completed.find(
          (todo) => todo.id === id
        );
        if (todo) {
          state.userRecords[email].incomplete.push({
            ...todo,
            completedOn: undefined,
          });
          state.userRecords[email].completed = state.userRecords[
            email
          ].completed.filter((todo) => todo.id !== id);
        }
      }
    },
    updateTodo: (
      state,
      action: PayloadAction<{
        email: string;
        id: string;
        updatedItem: Partial<TodoItem>;
      }>
    ) => {
      const { email, id, updatedItem } = action.payload;
      if (state.userRecords[email]) {
        const incompleteIndex = state.userRecords[email].incomplete.findIndex(
          (todo) => todo.id === id
        );
        if (incompleteIndex > -1) {
          state.userRecords[email].incomplete[incompleteIndex] = {
            ...state.userRecords[email].incomplete[incompleteIndex],
            ...updatedItem,
          };
        } else {
          const completedIndex = state.userRecords[email].completed.findIndex(
            (todo) => todo.id === id
          );
          if (completedIndex > -1) {
            state.userRecords[email].completed[completedIndex] = {
              ...state.userRecords[email].completed[completedIndex],
              ...updatedItem,
            };
          }
        }
      }
    },
  },
});

export const appReducer = appSlice.reducer;
export const {
  setAppMode,
  setMessage,
  addUserRecord,
  addTodo,
  deleteTodo,
  completeTodo,
  incompleteTodo,
  updateTodo,
} = appSlice.actions;
