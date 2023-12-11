import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { TActions, TState } from '~/utils/types';
import { produce } from 'immer';
export const useStore = create<
  TState & TActions,
  [
    ['zustand/persist', TState & TActions],
    ['zustand/devtools', TState & TActions]
  ]
>(
  persist(
    devtools((set) => ({
      tasks: [],
      lastTicketNumber: 0,
      addTask: (task) =>
        set(
          produce((state) => {
            state.tasks.push(task);
            state.lastTicketNumber += 1;
          })
        ),

      // set((state) => ({
      //   tasks: [...state.tasks, task],
      //   lastTicketNumber: state.lastTicketNumber + 1,
      // }))

      updateTask: (task) =>
        set((state) => ({
          tasks: state.tasks.map((t) => (t.id === task.id ? task : t)),
        })),
      removeTask: (id) =>
        set((state) => ({
          tasks: state.tasks.filter((task) => task.id !== id),
        })),

      setDraggedTask: (task) => set({ draggedTask: task }),
      draggedTask: null,
    })),
    { name: 'tasks' }
  )
);
