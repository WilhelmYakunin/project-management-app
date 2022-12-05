import { IBoardItemProps } from './interfaces';
import styles from './boards-item.module.css';
import { useAppDispatch, useTranslate } from '../../app/hooks';
import { deleteBoardById, editBoardById } from '../../utils/API/API-responses';
import {
  editBoardInBoardsListState,
  removeBoardInBoardsListState,
} from '../../app/reducers/boards-page-slice';

function BoardsItem({ data }: IBoardItemProps) {
  const dispatch = useAppDispatch();
  const { t } = useTranslate();
  const boardId = data._id;

  async function onEditClickHandler(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    const mockModalEditBoardData = {
      title: 'editTest',
      owner: 'editTest',
      users: ['editTest'],
    };

    if (!boardId) {
      alert('invalid Id'); //предполагается модалка
      return;
    }
    dispatch(editBoardInBoardsListState({ ...mockModalEditBoardData, _id: boardId }));
    const response = await editBoardById(boardId, mockModalEditBoardData);
    if (!response.ok) {
      const result = await response.json();
      alert(`editBoardById ERROR! status: ${response.status}, message: ${result.message}`); //предполагается модалка
      return;
    }
  }

  async function onRemoveClickHandler(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    if (!boardId) {
      alert('invalid Id'); //предполагается модалка
      return;
    }
    dispatch(removeBoardInBoardsListState(boardId));
    const response = await deleteBoardById(boardId);
    if (!response.ok) {
      const result = await response.json();
      alert(`deleteBoardById ERROR! status: ${response.status}, message: ${result.message}`); //предполагается модалка
      return;
    }
  }

  return (
    <div className={`${styles['board-wrapper']} ${styles['board']}`}>
      <span className={styles['board__title']}>{data.title}</span>
      <span className={styles['board__owner']}>{data.owner}</span>
      <div className={styles['board__actions-wrapper']}>
        <button className={styles['board__edit-btn']} onClick={onEditClickHandler}>
          {t('edit')}
        </button>
        <button className={styles['board__remove-btn']} onClick={onRemoveClickHandler}>
          {t('удалить')}
        </button>
      </div>
    </div>
  );
}

export default BoardsItem;
