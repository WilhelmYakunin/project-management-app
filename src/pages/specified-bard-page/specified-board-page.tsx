import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { setColumnsListState } from '../../app/reducers/specified-board-page-slice';
import ColumnsList from '../../features/columns-list/columns-list';
import { getColumnsListByBoardId } from '../../utils/API/API-responses';
import styles from './specified-board-page.module.css';

function SpecifiedBoardPage() {
  const { id } = useParams();

  // const boardPageState = useAppSelector((state) => state.boardsPage.boardsListState);

  // const boardData = boardPageState.data.find(
  //   (item) => {
  //     if(!item._id) return null;
  //     return item._id.toString() === id;
  //   }
  // );
  // if (!boardData) return <strong>data not found</strong>;

  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state.specifiedBoardPage);

  useEffect(() => {
    if (!state.columnsListState.isLoaded || state.columnsListState.error) fetchColumnsData();
  }, []);

  async function fetchColumnsData() {
    if (!id) {
      alert(`SpecifiedBoardPage: invalid id of board. id:${id}`);
      return;
    }
    const response = await getColumnsListByBoardId(id);
    const result = await response.json();

    response.status === 200
      ? dispatch(
          setColumnsListState({
            isLoaded: true,
            error: null,
            data: result,
          })
        )
      : dispatch(
          setColumnsListState({
            isLoaded: true,
            data: state.columnsListState.data,
            error: `fetchColumnsData ERROR! status: ${response.status}, message: ${result.message}`,
          })
        );
  }

  return (
    <div className={styles['specified-board-page']}>
      <Link to="/boards">
        <button>Back</button>
        {/* //! использовать Translate */}
      </Link>
      {/* {!state.columnsListState.isLoaded && <strong>Loading...</strong>}
        {state.columnsListState.error && <strong>{state.columnsListState.error}</strong>} */}
      {state.columnsListState.isLoaded && <ColumnsList dataList={state.columnsListState.data} />}
    </div>
  );
}

export default SpecifiedBoardPage;
