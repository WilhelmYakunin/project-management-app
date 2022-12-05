import styles from './columns-item.module.css';
import { useAppDispatch, useTranslate } from '../../app/hooks';
import { IColumnItemProps } from './interfaces';

function ColumnsItem({ data }: IColumnItemProps) {
  const dispatch = useAppDispatch();
  const { t } = useTranslate();

  return (
    <div
      className={`${styles['columns-list__item']} ${styles['column-wrapper']} ${styles['column']}`}
    >
      <span className={styles['column__title']}>{data.title}</span>
      <span>КОЛОНКА</span>
    </div>
  );
}

export default ColumnsItem;
