import './Column.scss';
import plus from '~/assets/plus.svg';
import { useMemo, useRef, useState } from 'react';
import Modal from 'react-modal';
import { Task } from '~/components';
import { customStyles } from '~/utils/misc';
import { TTaskStatus } from '~/utils/types';
import { useStore } from '~/store/useStore';

type Props = {
  colName: TTaskStatus;
};

export const Column = ({ colName }: Props) => {
  const [showModal, setShowModal] = useState(false);
  const newTaskRef = useRef<null | HTMLTextAreaElement>(null);

  const allTasks = useStore((state) => state.tasks);
  const lastTickerNumber = useStore((state) => state.lastTicketNumber);
  const addTask = useStore((state) => state.addTask);
  const updateTask = useStore((state) => state.updateTask);
  const setDraggedTask = useStore((state) => state.setDraggedTask);
  const draggedTask = useStore((state) => state.draggedTask);

  const tasks = useMemo(() => {
    return allTasks.filter((task) => task.status === colName);
  }, [allTasks, colName]);

  const handleSubmit = () => {
    addTask({
      id: `TA-${lastTickerNumber + 1}`,
      name: newTaskRef.current!.value,
      status: colName,
    });
    newTaskRef.current!.value = '';
    setShowModal(false);
  };

  const handleDrop = () => {
    updateTask({
      ...draggedTask!,
      status: colName,
    });
    setDraggedTask(null);
  };
  return (
    <>
      <div
        className='column'
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
      >
        <h2 className='column-heading'>
          {colName}
          <img src={plus} width='28px' onClick={() => setShowModal(true)} />
        </h2>

        <div>
          {tasks.map((task) => (
            <Task task={task} key={task.id} />
          ))}
        </div>
      </div>
      <Modal
        isOpen={showModal}
        onRequestClose={() => setShowModal(false)}
        style={customStyles}
      >
        <div className='modal-content'>
          <textarea
            placeholder='Add a task here...'
            ref={newTaskRef}
            rows={4}
          ></textarea>

          <div className='submit-btn'>
            <button onClick={handleSubmit}>Add</button>
          </div>
        </div>
      </Modal>
    </>
  );
};
