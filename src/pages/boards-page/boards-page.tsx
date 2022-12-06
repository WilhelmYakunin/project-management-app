import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { setBoardsListState } from '../../app/reducers/boards-page-slice';
import BoardsList from '../../features/boards-list/boards-list';
import { getBoardsList } from '../../utils/API/API-responses';
import { getInitUsersStatus } from '../../app/selectors';
import { onInit } from '../../features/modals/modalsSlice';
import Spinner from '../../features/spinner/spinner';

import styles from './boards-page.module.css';

const BoardsPage = () => {
  const dispatch = useAppDispatch();
  const users = useAppSelector(getInitUsersStatus);
  const user = useAppSelector((state) => state.user.current);
  const state = useAppSelector((state) => state.boardsPage.boardsListState);
 
  useEffect(() => {
    const fetchBoardsData = async () => {
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

    if (!state.isLoaded || state.error) fetchBoardsData();
    if (users !== 'loaded') dispatch(onInit())
  }, [state.isLoaded, state.data, state.error, users, dispatch]);

  return user && (
    <div className={styles['boards-page']}>
      {!state.isLoaded && <Spinner />}
      {state.error && <strong>{state.error}</strong>}
      {state.isLoaded && <BoardsList dataList={state.data} />}
    </div>
  );
}

export default BoardsPage;
