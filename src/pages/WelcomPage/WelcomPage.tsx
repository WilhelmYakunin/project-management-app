import { Footer } from '../../components/Footer/Footer';
import { Header } from '../../components/Header/Header';
import style from './WelcomPage.module.css';

export const WelcomPage = () => {
  return <>
    <div className={style.WelcomPage_wrapper}>
      <Header/>
      <Footer/>
    </div>
  </>;
}
