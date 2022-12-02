import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { setBoardsListState } from '../../app/reducers/boards-page-slice';
import BoardsList from '../../features/boards-list/boards-list';
import { getBoardsList } from '../../utils/API/API-responses';
import styles from './boards-page.module.css';

function BoardsPage() {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state.boardsPage.boardsListState);

  useEffect(() => {
    if (!state.isLoaded || state.error) fetchBoardsData();
  }, []);

  async function fetchBoardsData() {
    const response = await getBoardsList();
    const result = await response.json();

    response.status === 200
      ? dispatch(
          setBoardsListState({
            isLoaded: true,
            error: null,
            data: result,
          })
        )
      : dispatch(
          setBoardsListState({
            isLoaded: true,
            data: state.data,
            error: `fetchBoardsData ERROR! status: ${response.status}, message: ${result.message}`,
          })
        );
  }

  return (
    <div className={styles['boards-page']}>
      {!state.isLoaded && <strong>Loading...</strong>}
      {state.error && <strong>{state.error}</strong>}
      {state.isLoaded && <BoardsList dataList={state.data} />}
    </div>
  );
}

export default BoardsPage;
