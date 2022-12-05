import styles from './tasks-list.module.css';
import { useAppDispatch, useAppSelector, useTranslate } from '../../app/hooks';
import TasksItem from '../tasks-item/tasks-item';
import { ITasksListProps } from './interfaces';
import { ITaskData } from '../tasks-item/interfaces';

function TasksList({ dataList }: ITasksListProps) {
  const dataIsLoaded = dataList && dataList.length !== 0;
  const { t } = useTranslate();
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state.specifiedBoardPage.tasksListState);

  const tasksList = dataList.map((itemData: ITaskData) => (
    <TasksItem key={itemData._id} data={itemData} />
  ));

  // async function addBoardInList() {
  //   const mockModalBoardData = {
  //     title: 'addTest',
  //     owner: 'addTest',
  //     users: ['addTest'],
  //   };

  //   const response = await pushNewBoardToList(mockModalBoardData);
  //   const result = await response.json();
  //   if (!response.ok) {
  //     alert(`pushNewBoardToList ERROR! status: ${response.status}, message: ${result.message}`); //предполагается модалка
  //     return;
  //   }
  //   dispatch(addBoardToBoardsListState(result));
  // }

  return (
    <div
      className={`${styles['tasks-list__tasks-list']} ${styles['tasks-list-wrapper']} ${styles['tasks-list']}`}
    >
      {!state.isLoaded && <strong>Loading...</strong>}
      {state.error && <strong>{state.error}</strong>}
      {!dataIsLoaded && !state.error && <strong>Похоже, нет ни одной задачи</strong>}
      {/* //!использовать Translate */}
      {dataIsLoaded && tasksList}
      {/* <button className={styles['boards-list__add-board-btn']} onClick={addBoardInList}>
        {t('+ Добавить доску')}
      </button> */}
    </div>
  );
}

export default TasksList;
