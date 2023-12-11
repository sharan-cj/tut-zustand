import { TTask } from '~/utils/types';
import './Task.scss';
import trash from '~/assets/trash.svg';
import { useState } from 'react';
import Modal from 'react-modal';
import { customStyles } from '~/utils/misc';
import { useStore } from '~/store/useStore';

type Props = {
  task: TTask;
};
export const Task = ({ task }: Props) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const removeTask = useStore((state) => state.removeTask);
  const setDraggedTask = useStore((state) => state.setDraggedTask);
  const handleDelete = () => {
    removeTask(task.id);
    setShowDeleteModal(false);
  };
  return (
    <>
      <div className='task' draggable onDragStart={() => setDraggedTask(task)}>
        <div className='task-head'>
          <h5>{task.id}</h5>
          <img
            src={trash}
            width='18px'
            onClick={() => setShowDeleteModal(true)}
          />
        </div>
        <p>{task.name}</p>
      </div>
      <Modal
        isOpen={showDeleteModal}
        onRequestClose={() => setShowDeleteModal(false)}
        style={customStyles}
      >
        <div className='modal-content'>
          <p>Are you sure you want to delete task {task.id}?</p>
          <div className='submit-btn'>
            <button onClick={handleDelete}>Confirm</button>
          </div>
        </div>
      </Modal>
    </>
  );
};
