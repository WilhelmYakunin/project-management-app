import { Description } from '../../components/Description/Description';
import { Team } from '../../components/Team/Team';
import style from './WelcomPage.module.css';

export const WelcomPage = () => {
  return (
      <div className={style.WelcomPage_wrapper}>
        <Description />
        <Team />
      </div>
  );
};
