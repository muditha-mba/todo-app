export type TodoItem = {
  id: string;
  title: string;
  description: string;
  isCompleted: boolean;
  completedOn?: string;
  createdOn?: string;
};
