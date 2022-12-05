import styles from './columns-list.module.css';
import { useAppDispatch, useAppSelector, useTranslate } from '../../app/hooks';
import ColumnsItem from '../columns-item/columns-item';
import { IColumnsListProps } from './interfaces';
import { IColumnData } from '../columns-item/interfaces';

function ColumnsList({ dataList }: IColumnsListProps) {
  const dataIsLoaded = dataList && dataList.length !== 0;
  const { t } = useTranslate();
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state.specifiedBoardPage.columnsListState);

  const columnsList = dataList.map((itemData: IColumnData) => (
    <ColumnsItem key={itemData._id} data={itemData} />
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
    <div className={`${styles['columns-list-wrapper']} ${styles['columns-list']}`}>
      {!state.isLoaded && <strong>Loading...</strong>}
      {state.error && <strong>{state.error}</strong>}
      {!dataIsLoaded && !state.error && <strong>Похоже, нет ни одного столбца</strong>}
      {/* //!использовать Translate */}
      {dataIsLoaded && columnsList}
      {/* <button className={styles['boards-list__add-board-btn']} onClick={addBoardInList}>
        {t('+ Добавить доску')}
      </button> */}
    </div>
  );
}

export default ColumnsList;
