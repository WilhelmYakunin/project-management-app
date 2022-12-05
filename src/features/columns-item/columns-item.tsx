import styles from './columns-item.module.css';
import { useAppDispatch, useAppSelector, useTranslate } from '../../app/hooks';
import { IColumnItemProps } from './interfaces';

function ColumnsItem({ data }: IColumnItemProps) {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state.specifiedBoardPage.tasksListState);
  const { t } = useTranslate();

  useEffect(() => {
    if (!state.isLoaded || state.error) fetchColumnsData();
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
    <div
      className={`${styles['columns-list__item']} ${styles['column-wrapper']} ${styles['column']}`}
    >
      <span className={styles['column__title']}>{data.title}</span>
      {/* <TasksList /> */}
    </div>
  );
}

export default ColumnsItem;
