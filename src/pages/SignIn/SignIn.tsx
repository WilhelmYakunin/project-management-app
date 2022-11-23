import style from './SignIn.module.css';
  
  export const SignIn = () => {

  return (
    <div>
      <form className={style.login_form}>
      <p className={style.login_form_text}>Log in to your account</p>
        <div>
          <input
            className={style.login_form_input}
            placeholder="E-mail"
          />
        </div>
        <div>
          <input
            className={style.login_form_input}
            type="password"
            placeholder="Password"
          />
        </div>
        <button
          type="submit"
          className={style.login_form_input + ' ' + style.login_form_btn}
        >
          LogIn
        </button>
      </form>
    </div>
  );
};
