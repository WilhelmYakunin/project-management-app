import React, { useCallback } from 'react';
import styles from './boards-list.module.css';
import { Link } from 'react-router-dom';
import BoardsItem from '../boards-item/boards-item';
import { IBoardsListProps } from './interfaces';
import { IBoardData } from '../boards-item/interfaces';
import { useAppDispatch, useAppSelector, useTranslate } from '../../app/hooks';
import { addBoardToBoardsListState } from '../../app/reducers/boards-page-slice';
import { pushNewBoardToList } from '../../utils/API/API-responses';
import { openModal } from '../modals/modalsSlice'

const BoardsList = ({ dataList }: IBoardsListProps) => {
  const dataIsLoaded = dataList && dataList.length !== 0;
  const { t } = useTranslate();
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state.boardsPage.boardsListState);

  const boardsList = dataList.map((itemData: IBoardData) => (
    <Link className={styles['boards-list__item']} key={itemData._id} to={`/boards/${itemData._id}`}>
      <BoardsItem data={itemData} />
    </Link>
  ));

  async function addBoardInList() {
    const mockModalBoardData = {
      title: 'addTest',
      owner: 'addTest',
      users: ['addTest'],
    };

    const response = await pushNewBoardToList(mockModalBoardData);
    const result = await response.json();
    if (!response.ok) {
      alert(`pushNewBoardToList ERROR! status: ${response.status}, message: ${result.message}`); //предполагается модалка
      return;
    }
    dispatch(addBoardToBoardsListState(result));
  }

  const callbacks = {
    onCreate: useCallback(() => 
        dispatch(openModal({type: 'createBoard', 
            info: { operation: 'create-board', ids: { boardId: 'idle', columnId: 'idle', taskId: 'idle' } }})), 
    [dispatch])
}

  return (
    <div className={`${styles['boards-list-wrapper']} ${styles['boards-list']}`}>
      {dataIsLoaded && boardsList}
      {!dataIsLoaded && !state.error && <strong>{t('boardsPage').no_board}</strong>}
      <button className={styles['boards-list__add-board-btn']} onClick={callbacks.onCreate}>
        {t('boardsPage').add}
      </button>
    </div>
  );
}

export default BoardsList;
