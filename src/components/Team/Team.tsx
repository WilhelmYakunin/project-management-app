import style from './Team.module.css';

export const Team = () => {
  return (
    <div className={style.team_wrapper}>
      <p className={style.team_title}>Team</p>
      <div className={style.team_string}>
     
          <a className={style.team_list} href="https://github.com/WilhelmYakunin" target="_blank" rel="noreferrer">
            <div className={style.team_ava}></div>
            <p>WilhelmYakunin</p>
            <p>Team Lead, Frontend developer</p>
          </a>
     
          <a className={style.team_list} href="https://github.com/fraterpavlo" target="_blank" rel="noreferrer">
            <div className={style.team_ava}></div>
            <p>fraterpavlo</p>
            <p>Frontend developer</p>
          </a>
      
          <a className={style.team_list} href="https://github.com/KateHubar" target="_blank" rel="noreferrer">
            <div className={style.team_ava}></div>
            <p>KateHubar</p>
            <p>Frontend developer</p>
          </a>
       
      </div>
    </div>
  );
};
