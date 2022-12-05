import styles from './columns-item.module.css';
import { useAppDispatch, useAppSelector, useTranslate } from '../../app/hooks';
import { IColumnItemProps } from './interfaces';
import { useEffect } from 'react';
import { deleteColumn, editColumn, getTasksInColumn } from '../../utils/API/API-responses';
import {
  editColumnInColumnsListState,
  removeColumnInColumnListState,
  setTasksListInColumn,
} from '../../app/reducers/specified-boards-pages-slice';
import TasksList from '../tasks-list/tasks-list';

import { getInitUsersStatus } from '../../app/selectors'
import { onInit } from '../modals/modalsSlice'

function ColumnsItem({ data }: IColumnItemProps) {
  const boardId = data.boardId!;
  const columnId = data._id!;
  
  const usersStatus = useAppSelector(getInitUsersStatus)
  
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state.specifiedBoardsPages[`${boardId}`].tasksListState);
  const { t } = useTranslate();

  useEffect(() => {
    async function fetchTasksData() {
      const response = await getTasksInColumn(boardId, columnId);
      const result = await response.json();
  
      response.status === 200
        ? dispatch(
            setTasksListInColumn({
              boardId,
              columnId,
              isLoaded: true,
              error: null,
              data: result,
            })
          )
        : dispatch(
            setTasksListInColumn({
              boardId,
              columnId,
              isLoaded: true,
              data: state[`${columnId}`].data ?? [],
              error: `fetchTasksData ERROR! status: ${response.status}, message: ${result.message}`,
            })
          );
    }

    if (!state || !state[`${columnId}`])
      dispatch(
        setTasksListInColumn({
          boardId: boardId,
          columnId: columnId,
          isLoaded: false,
          data: [],
          error: null,
        })
      );

    if (!state[`${columnId}`]?.isLoaded || state[`${columnId}`]?.error) fetchTasksData();
    if (usersStatus !== 'loaded') dispatch(onInit())
  }, [state, boardId, columnId, usersStatus, dispatch]);

  async function onEditClickHandler(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    const mockModalEditColumnData = {
      title: 'editTest',
      order: 0,
    }; //предполагается модалка

    dispatch(editColumnInColumnsListState({ ...mockModalEditColumnData, _id: columnId, boardId }));
    const response = await editColumn(data, mockModalEditColumnData);
    if (!response.ok) {
      const result = await response.json();
      alert(`editColumn ERROR! status: ${response.status}, message: ${result.message}`); //предполагается модалка
      return;
    }
  }

  async function onRemoveClickHandler(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();

    dispatch(removeColumnInColumnListState(data));
    const response = await deleteColumn(data);
    if (!response.ok) {
      const result = await response.json();
      alert(`deleteBoardById ERROR! status: ${response.status}, message: ${result.message}`); //предполагается модалка
      return;
    }
  }

  return (
    <div
      className={`${styles['columns-list__item']} ${styles['column-wrapper']} ${styles['column']}`}
    >
      <span className={styles['column__title']}>{data.title}</span>
      <div className={styles['column__actions-wrapper']}>
        <button className={styles['column__edit-btn']} onClick={onEditClickHandler}>
          {t('edit')} {/* //! использовать Translate */}
        </button>
        <button className={styles['column__remove-btn']} onClick={onRemoveClickHandler}>
          {t('удалить')} {/* //! использовать Translate */}
        </button>
      </div>
      {/* {!state[`${columnId}`]?.isLoaded && <strong>Loading...</strong>}
      {state[`${columnId}`]?.error && <strong>{state[`${columnId}`]?.error}</strong>} */}
      {state[`${columnId}`]?.isLoaded && (
        <TasksList dataList={state[`${columnId}`]?.data} boardId={boardId} columnId={columnId} />
      )}
    </div>
  );
}

export default ColumnsItem;
