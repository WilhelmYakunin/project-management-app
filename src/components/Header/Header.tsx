import style from './Header.module.css';
import { NavLink } from 'react-router-dom';
import LocaleSelect from '../../features/locales/localesSelect';
import { useAppDispatch, useAppSelector, useTranslate } from '../../app/hooks';
import { logoutUser } from '../../app/reducers/user';

export const Header = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);
  const { t } = useTranslate();
  const logOut = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(logoutUser(null));
    localStorage.removeItem('auth_token');
    localStorage.removeItem('auth_token_exp_date');
  }
  console.log(user);
  return (
    <header className={style.header}>
      <div>
        <NavLink
          to="/project-management-app/"
          className={style.header_link}>
          {t('header').button5}
        </NavLink>
      </div>
      <div className={style.header_nav}>
        <LocaleSelect />
        {user && (
          <>
            <NavLink
              to="/project-management-app/"
              className={({ isActive }) =>
                isActive ? `${style.header_link} ${style.active}` : style.header_link
              }
            >
              {t('header').button4}
            </NavLink>
            <button className={style.header_logout} onClick={logOut}>
            {t('header').button3}
            </button>
          </>
        )} 
        {!user && (
          <>
            <NavLink
              to="/project-management-app/SignIn"
              className={({ isActive }) =>
                isActive ? `${style.header_link} ${style.active}` : style.header_link
              }
            >
              
              {t('header').button1}
            </NavLink>
            <NavLink
              to="/project-management-app/SignUp"
              className={({ isActive }) =>
                isActive ? `${style.header_link} ${style.active}` : style.header_link
              }
            >
              {t('header').button2}
            </NavLink>
          </>
        )}
      </div>
    </header>
  );
};

