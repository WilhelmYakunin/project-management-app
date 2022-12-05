import style from './Header.module.css';
import { NavLink, useLocation } from 'react-router-dom';
import LocaleSelect from '../../features/locales/localesSelect';
import { useAppSelector, useTranslate } from '../../app/hooks';
import LogOutButton from '../../features/buttons/logOutButton/logOutButton';
import CreateBoardButton from '../../features/buttons/createBoardButton/createBoardButton';
import EditUserProfile from '../../features/buttons/userProfileButton/editUserProfile';
import { useEffect, useState } from 'react';

export const Header = () => {
  const user = useAppSelector((state) => state.user.current);
  const { t } = useTranslate();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    window.addEventListener('scroll', handleScrolling);

    return () => {
      window.removeEventListener('scroll', handleScrolling);
    };
  });

  const location = useLocation();

  const handleScrolling = (ev: Event) => {
    const scrolledTop = (ev.target as Document).scrollingElement?.scrollTop ?? 0;
    setIsScrolled(scrolledTop > 0);
  };
  
  return (
    <header className={`${style.header} ${isScrolled ? style.scrolled : ''}`}>
      <div>
        <NavLink to="/project-management-app/" className={style.header_link}>
          {t('header').home}
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
              {t('header').signin}
            </NavLink>
            <NavLink
              to="/SignUp"
              className={({ isActive }) =>
                isActive ? `${style.header_link} ${style.active}` : style.header_link
              }
            >
              {t('header').signup}
            </NavLink>
          </>
        )}
        <LocaleSelect />
      </div>
    </header>
  );
};
