import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { setColumnsListState } from '../../app/reducers/specified-boards-pages-slice';
import ColumnsList from '../../features/columns-list/columns-list';
import { getColumnsListByBoardId } from '../../utils/API/API-responses';
import styles from './specified-board-page.module.css';

function SpecifiedBoardPage() {
  const { id } = useParams();

  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state.specifiedBoardsPages[`${id}`]);

  useEffect(() => {
    if (!state)
      dispatch(
        setColumnsListState({
          boardId: id ?? '',
          isLoaded: false,
          error: null,
          data: [],
        })
      );

    if (!state || !state?.columnsListState.isLoaded || state?.columnsListState.error)
      fetchColumnsData();
  }, []);

  async function fetchColumnsData() {
    if (!id) {
      alert(`SpecifiedBoardPage: invalid id of board. id:${id}`); // предполагается модалка
      return;
    }
    const response = await getColumnsListByBoardId(id);
    const result = await response.json();

    response.status === 200
      ? dispatch(
          setColumnsListState({
            boardId: id,
            isLoaded: true,
            error: null,
            data: result,
          })
        )
      : dispatch(
          setColumnsListState({
            boardId: id,
            isLoaded: true,
            data: state.columnsListState.data ?? [],
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
      {state?.columnsListState.isLoaded && (
        <ColumnsList dataList={state?.columnsListState.data} boardId={id ?? ''} />
      )}
    </div>
  );
}

export default SpecifiedBoardPage;
