import styles from './tasks-item.module.css';
import { useAppDispatch, useTranslate } from '../../app/hooks';
import { ITasksItemProps } from './interfaces';

function TasksItem({ data }: ITasksItemProps) {
  const dispatch = useAppDispatch();
  const { t } = useTranslate();

  return (
    <div className={`${styles['tasks-list__item']} ${styles['task-wrapper']} ${styles['task']}`}>
      <span className={styles['task__title']}>{data.title}</span>
      <span className={styles['task__description']}>{data.description}</span>
    </div>
  );
}

export default TasksItem;
