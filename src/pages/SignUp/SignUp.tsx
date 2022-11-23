import style from './SignUp.module.css';

export const SignUp = () => {
  
  return (
    <div>
      <form className={style.login_form}>
      <p className={style.login_form_text}>Sign up for your account</p>
      <div>
      <input
            className={style.login_form_input}
            placeholder="Name"
          />
        </div>
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
          SignUp
        </button>
      </form>
    </div>
  );
};
