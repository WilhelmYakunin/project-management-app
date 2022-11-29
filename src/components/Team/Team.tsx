import style from './Team.module.css';

export const Team = () => {
  return (
    <div className={style.team_wrapper}>
      <p className={style.team_title}>Team</p>
      <div className={style.team_string}>
      <ul className={style.team_list}>
        <li>
          <a href="https://github.com/WilhelmYakunin" target="_blank" rel="noreferrer">
            <div className={style.team_ava}></div>
          </a>
        </li>
        <li className={style.team_text}>
          <a href="https://github.com/WilhelmYakunin" target="_blank" rel="noreferrer">
            WilhelmYakunin
          </a>
        </li>
        <li>
          <p>Team Lead, Frontend developer</p>
        </li>
      </ul>

      <ul className={style.team_list}>
        <li>
          <a href="https://github.com/fraterpavlo" target="_blank" rel="noreferrer">
            <div className={style.team_ava}></div>
          </a>
        </li>
        <li className={style.team_text}>
          <a href="https://github.com/fraterpavlo" target="_blank" rel="noreferrer">
          fraterpavlo
          </a>
        </li>
        <li>
          <p>Frontend developer</p>
        </li>
      </ul>
      
      <ul className={style.team_list}>
        <li>
          <a href="https://github.com/KateHubar" target="_blank" rel="noreferrer">
            <div className={style.team_ava}></div>
          </a>
        </li>
        <li className={style.team_text}>
          <a href="https://github.com/KateHubar" target="_blank" rel="noreferrer">
          KateHubar
          </a>
        </li>
        <li>
          <p>Frontend developer</p>
        </li>
      </ul>
      </div>
    </div>
  );
};
