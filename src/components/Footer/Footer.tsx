import style from './Footer.module.css';

export const Footer = () => {
  return (
    <div className={style.footer}>
      <p>&copy; 2022</p>
      <ul className={style.footer_list}>
        <li>
          <a href="https://github.com/WilhelmYakunin" target="_blank" rel="noreferrer"> @WilhelmYakunin </a>
        </li>
        <li>
          <a href="https://github.com/fraterpavlo" target="_blank" rel="noreferrer"> @fraterpavlo </a>
        </li>
        <li>
          <a href="https://github.com/KateHubar" target="_blank" rel="noreferrer"> @KateHubar </a>
        </li>

      </ul>
      <a className={style.footer_rss} target="_blank" href="https://rs.school/react/" rel="noreferrer">.</a>
    </div>
  );
};
