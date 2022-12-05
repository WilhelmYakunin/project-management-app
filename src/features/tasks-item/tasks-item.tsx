import styles from './tasks-item.module.css';
import { useAppDispatch, useTranslate } from '../../app/hooks';
import { ITasksItemProps } from './interfaces';
import {
  editTaskInTasksListState,
  removeTaskInTasksListState,
} from '../../app/reducers/specified-boards-pages-slice';
import { deleteTask, editTask } from '../../utils/API/API-responses';

import UpdateTaskButton from '../buttons/updateTaskButton/updateTaskButton'
import DeleteTaskButton from '../buttons/deleteTaskButton/deleteTaskButton';

function TasksItem({ data }: ITasksItemProps) {
  const dispatch = useAppDispatch();
  const { t } = useTranslate();

  async function onEditClickHandler(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    const mockModalEditTaskData = {
      title: 'editTaskTest',
      order: 0,
      description: 'editTaskTest',
      columnId: 'editTaskTest',
      userId: 0,
      users: ['editTaskTest'],
    }; //предполагается модалка

    dispatch(
      editTaskInTasksListState({
        ...mockModalEditTaskData,
        _id: data._id,
        boardId: data.boardId,
        columnId: data.columnId,
      })
    );
    const response = await editTask(data, mockModalEditTaskData);
    if (!response.ok) {
      const result = await response.json();
      alert(`editTask ERROR! status: ${response.status}, message: ${result.message}`); //предполагается модалка
      return;
    }
  }

  async function onRemoveClickHandler(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();

    dispatch(removeTaskInTasksListState(data));
    const response = await deleteTask(data);
    if (!response.ok) {
      const result = await response.json();
      alert(`deleteTask ERROR! status: ${response.status}, message: ${result.message}`); //предполагается модалка
      return;
    }
  }

  return (
    <div className={`${styles['tasks-list__item']} ${styles['task-wrapper']} ${styles['task']}`}>
      <span className={styles['task__title']}>{data.title}</span>
      <span className={styles['task__description']}>{data.description}</span>
      <div className={styles['task__actions-wrapper']}>
        <UpdateTaskButton boardId={data.boardId} columnId={data.columnId} taskId={data._id} userId={data.userId} />
        <DeleteTaskButton boardId={data.boardId} columnId={data.columnId} taskId={data._id} />
      </div>
    </div>
  );
}

export default TasksItem;
