import styles from './tasks-list.module.css';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import TasksItem from '../tasks-item/tasks-item';
import { ITasksListProps } from './interfaces';
import { ITaskData } from '../tasks-item/interfaces';
import { createTaskInColumn } from '../../utils/API/API-responses';
import { addTaskToTasksListState } from '../../app/reducers/specified-boards-pages-slice';

import CreateTaskButton from '../buttons/createTaskButton/createTaskButton';

function TasksList({ dataList, boardId, columnId }: ITasksListProps) {
  const dataIsLoaded = dataList && dataList.length !== 0;
  const dispatch = useAppDispatch();
  const state = useAppSelector(
    (state) => state.specifiedBoardsPages[`${boardId}`].tasksListState[`${columnId}`]
  );
  const user = useAppSelector(state => state.user.current)
 
  const tasksList = dataList.map((itemData: ITaskData) => (
    <TasksItem key={itemData._id} data={itemData} />
  ));

  async function addTaskInList() {
    const mockModalTaskData = {
      title: 'addTaskTest',
      order: 0,
      description: 'addTaskTest',
      userId: 0,
      users: ['addTaskTest'],
    };

    const response = await createTaskInColumn(mockModalTaskData, boardId, columnId);
    const result = await response.json();
    if (!response.ok) {
      alert(`createTaskInColumn ERROR! status: ${response.status}, message: ${result.message}`); //предполагается модалка
      return;
    }
    dispatch(addTaskToTasksListState(result));
  }

  return (
    <div
      className={`${styles['column__tasks-list']} ${styles['tasks-list-wrapper']} ${styles['tasks-list']}`}
    >
      <CreateTaskButton boardId={boardId} columnId={columnId} userId={user.user._id} />
      {!state.isLoaded && <strong>Loading...</strong>}
      {state.error && <strong>{state.error}</strong>}
      {!dataIsLoaded && !state.error && <strong>Похоже, нет ни одной задачи</strong>}
      {/* //!использовать Translate */}
      {dataIsLoaded && tasksList}
    </div>
  );
}

export default TasksList;

