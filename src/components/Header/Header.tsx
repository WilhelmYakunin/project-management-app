import style from './Header.module.css';
import { NavLink } from 'react-router-dom';

export const Header = () => {
  return <header className={style.header}>
        <NavLink
            to='/SignIn'
            className={({isActive}) => (isActive ? `${style.header_link} ${style.active}` : style.header_link)}
        >
          Sign In
        </NavLink>
        <NavLink
            to='/SignUp'
            className={({isActive}) => (isActive ? `${style.header_link} ${style.active}` : style.header_link)}
        >
          Sign Up
        </NavLink>
  </header>

}
