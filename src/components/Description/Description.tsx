import { useTranslate } from '../../app/hooks';
import  style from './Description.module.css';

export const Description = () => {
  const { t } = useTranslate();
  return(
  <div  className={style.Description_text}>{t('description')} </div>
  )
}


