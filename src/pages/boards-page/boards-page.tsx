import { useCallback, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { setBoardsListState, setSearchInputValue } from '../../app/reducers/boards-page-slice';
import BoardsList from '../../features/boards-list/boards-list';
import { getBoardsList } from '../../utils/API/API-responses';
import { getInitUsersStatus } from '../../app/selectors';
import { onInit } from '../../features/modals/modalsSlice';
import Spinner from '../../features/spinner/spinner';

import styles from './boards-page.module.css';
import LazyTextInput from '../../features/lazy-text-input/lazy-text-input';

const BoardsPage = () => {
  const dispatch = useAppDispatch();
  const users = useAppSelector(getInitUsersStatus);
  const user = useAppSelector((state) => state.user.current);
  const state = useAppSelector((state) => state.boardsPage);

  const fetchBoardsData = useCallback(async () => {
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
            data: state.boardsListState.data,
            error: `fetchBoardsData ERROR! status: ${response.status}, message: ${result.message}`,
          })
        );
  }, [dispatch, state.boardsListState.data]);

  useEffect(() => {
    if (!state.boardsListState.isLoaded || state.boardsListState.error) fetchBoardsData();
    if (users !== 'loaded') dispatch(onInit());
  }, [
    state.boardsListState.isLoaded,
    state.boardsListState.data,
    state.boardsListState.error,
    users,
    dispatch,
    fetchBoardsData,
  ]);

  async function onBoardsSearchInput(value: string) {
    if (!value.trim()) await fetchBoardsData();
    if (state.boardsListState.data.length !== 0) dispatch(setSearchInputValue(value));
  }

  return (
    user && (
      <div className={styles['boards-page']}>
        {!state.boardsListState.isLoaded && <Spinner />}
        {state.boardsListState.error && <strong>{state.boardsListState.error}</strong>}
        <LazyTextInput
          onInputCallBack={onBoardsSearchInput}
          className={styles['boards-page__search-input']}
          placeholder={'Search by boards name'}
          defaultValue={state.searchInputValue ?? ''}
        />
        {state.boardsListState.isLoaded && <BoardsList dataList={state.boardsListState.data} />}
      </div>
    )
  );
};

export default BoardsPage;
