import style from './Header.module.css';
import { NavLink } from 'react-router-dom';

export const Header = () => {
  return (
    <header className={style.header}>
      <div>
        <NavLink
          to="/project-management-app/"
          className={({ isActive }) =>
            isActive ? `${style.header_link} ${style.active}` : style.header_link
          }
        >
          Home
        </NavLink>
      </div>
      <div className={style.header_nav}>
        <form action="" className={`${style.header_lang_btn} ${style.header_link}`}>
          En
        </form>
        <NavLink
          to="/project-management-app/SignIn"
          className={({ isActive }) =>
            isActive ? `${style.header_link} ${style.active}` : style.header_link
          }
        >
          Sign In
        </NavLink>
        <NavLink
          to="/project-management-app/SignUp"
          className={({ isActive }) =>
            isActive ? `${style.header_link} ${style.active}` : style.header_link
          }
        >
          Sign Up
        </NavLink>
      </div>
    </header>
  );
};
