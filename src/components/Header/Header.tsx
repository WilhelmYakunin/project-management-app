import style from './Header.module.css';
import { NavLink } from 'react-router-dom';
import LocaleSelect from '../../features/locales/localesSelect';
import { useAppSelector, useTranslate } from '../../app/hooks';
import LogOutButton from '../../features/buttons/logOutButton/logOutButton';
import CreateBoardButton from '../../features/buttons/createBoardButton/createBoardButton';
import EditUserProfile from '../../features/buttons/userProfileButton/editUserProfile';

export const Header = () => {
  const user = useAppSelector((state) => state.user.current);
  const { t } = useTranslate();
  
  return (
    <header className={style.header}>
      <div>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? `${style.header_link} ${style.active}` : style.header_link
          }
        >
          {t('home')}
        </NavLink>
      </div>
      <div className={style.header_nav}>
        {user && (
          <>
            <EditUserProfile />
            <CreateBoardButton />
            <NavLink
              to="/boards"
              className={({ isActive }) =>
                isActive ? `${style.header_link} ${style.active}` : style.header_link
              }
            >
              {t('main')}
            </NavLink>
            <LogOutButton />
          </>
        )} 
        {!user && (
          <>
            <NavLink
              to="/SignIn"
              className={({ isActive }) =>
                isActive ? `${style.header_link} ${style.active}` : style.header_link
              }
            >
              
              {t('header').button1}
            </NavLink>
            <NavLink
              to="/SignUp"
              className={({ isActive }) =>
                isActive ? `${style.header_link} ${style.active}` : style.header_link
              }
            >
              {t('header').button2}
            </NavLink>
          </>
        )}
        <LocaleSelect />
      </div>
    </header>
  );
};

