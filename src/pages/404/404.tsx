import { useTranslate } from '../../app/hooks';
import style from './404.module.css';

export const NotFound = () => {
  const { t } = useTranslate();
  return (
<div className={style.NotFound_page}>
  <p className={style.NotFound_title}>404</p>
  <p className={style.NotFound_text}>{t('NotFound')}</p>
</div>
  )
}
