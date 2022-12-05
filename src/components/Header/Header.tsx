import style from './Header.module.css';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import LocaleSelect from '../../features/locales/localesSelect';
import { useAppDispatch, useAppSelector, useTranslate } from '../../app/hooks';
import { logoutUser } from '../../app/reducers/user';
import { useEffect, useState } from 'react';

export const Header = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);
  const { t } = useTranslate();
  const [isScrolled, setIsScrolled] = useState(false);
  let navigate = useNavigate();

  useEffect(() => {
    window.addEventListener('scroll', handleScrolling);

    return () => {
      window.removeEventListener('scroll', handleScrolling);
    };
  });

  const location = useLocation();

  console.log('hash', location.hash);
  console.log('pathname', location.pathname);
  console.log('search', location.search);

  const handleScrolling = (ev: Event) => {
    const scrolledTop = (ev.target as Document).scrollingElement?.scrollTop ?? 0;
    setIsScrolled(scrolledTop > 0);
  };

  const logOut = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(logoutUser(null));
    localStorage.removeItem('auth_token');
    localStorage.removeItem('auth_token_exp_date');
    navigate('/project-management-app/');
  };
  return (
    <header className={`${style.header} ${isScrolled ? style.scrolled : ''}`}>
      <div>
        <NavLink to="/project-management-app/" className={style.header_link}>
          {t('header').home}
        </NavLink>
      </div>
      <div className={style.header_nav}>
        <LocaleSelect />
        {user && (
          <>
            {location.pathname !== '/project-management-app/boards' && (
              <NavLink
                to="/project-management-app/boards"
                className={({ isActive }) =>
                  isActive ? `${style.header_link} ${style.active}` : style.header_link
                }
              >
                {t('header').main}
              </NavLink>
            )}
            {location.pathname === '/project-management-app/boards' && (
              <NavLink
                to="/project-management-app/boards"
                className={({ isActive }) =>
                  isActive ? `${style.header_link} ${style.active}` : style.header_link
                }
              >
                {t('header').edit}
              </NavLink>
            )}
            <button className={style.header_logout} onClick={logOut}>
              {t('header').logout}
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
              {t('header').signin}
            </NavLink>
            <NavLink
              to="/project-management-app/SignUp"
              className={({ isActive }) =>
                isActive ? `${style.header_link} ${style.active}` : style.header_link
              }
            >
              {t('header').signup}
            </NavLink>
          </>
        )}
      </div>
    </header>
  );
};
