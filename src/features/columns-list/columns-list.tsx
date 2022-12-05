import styles from './columns-list.module.css';
import { useAppDispatch, useAppSelector, useTranslate } from '../../app/hooks';
import ColumnsItem from '../columns-item/columns-item';
import { IColumnsListProps } from './interfaces';
import { IColumnData } from '../columns-item/interfaces';
import { createColumnInBoard } from '../../utils/API/API-responses';
import { addColumnToColumnsListState } from '../../app/reducers/specified-boards-pages-slice';

import Spinner from '../spinner/spinner';
import CreateColumnButton from '../buttons/createColumnButton/createColumnButton';

function ColumnsList({ dataList, boardId }: IColumnsListProps) {
  if (!boardId) alert(`ColumnsList: invalid id of board. id:${boardId}`);
  const dataIsLoaded = dataList && dataList.length !== 0;
  const { t } = useTranslate();
  const dispatch = useAppDispatch();
  const state = useAppSelector(
    (state) => state.specifiedBoardsPages[`${boardId}`].columnsListState
  );

  const columnsList = dataList.map((itemData: IColumnData) => (
    <ColumnsItem key={itemData._id} data={itemData} />
  ));

  async function addColumnInList() {
    const mockModalColumnData = {
      title: 'addColumnTest',
      order: 0,
    }; //предполагается модалка

    const response = await createColumnInBoard(mockModalColumnData, boardId);
    const result = await response.json();
    if (!response.ok) {
      alert(`createColumnInBoard ERROR! status: ${response.status}, message: ${result.message}`); //предполагается модалка
      return;
    }
    dispatch(addColumnToColumnsListState(result));
  }

  return (
    <div
      className={`${styles['specified-board-page__columns-list']} ${styles['columns-list-wrapper']} ${styles['columns-list']}`}
    >
      {!state.isLoaded && <Spinner />}
      {state.error && <strong>{state.error}</strong>}
      {!dataIsLoaded && !state.error && <strong>{t('columns').no_column}</strong>}
      {dataIsLoaded && columnsList}
      <CreateColumnButton style={styles['columns-list__add-column-btn']} boardId={boardId} />
    </div>
  );
}

export default ColumnsList;
