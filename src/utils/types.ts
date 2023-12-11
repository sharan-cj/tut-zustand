export type TTaskStatus = 'Backlog' | 'In Progress' | 'Done';
export type TTask = {
  id: string;
  name: string;
  status: TTaskStatus;
};

export type TState = {
  tasks: TTask[];
  draggedTask: TTask | null;
  lastTicketNumber: number;
};

export type TActions = {
  addTask: (task: TTask) => void;
  removeTask: (id: string) => void;
  updateTask: (task: TTask) => void;

  setDraggedTask: (task: TTask | null) => void;
};
