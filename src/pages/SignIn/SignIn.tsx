import style from './SignIn.module.css';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { useAppDispatch } from '../../app/hooks';
import { loginUser } from '../../app/reducers/user';
import { loginService, userService } from '../../services';
import { User } from '../../models';
import { useNavigate } from 'react-router-dom';

const loginSchema = yup
  .object({
    password: yup
      .string()
      .min(8, 'Too Short! Use 8 symbols and more.')
      .max(50, 'Too Long!')
      .required('Required'),
    login: yup.string().required('Required'),
  })
  .required();

type LoginFormData = {
  password: string;
  login: string;
};

export const SignIn = () => {
  const dispatch = useAppDispatch();
  let navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: yupResolver(loginSchema),
  });

  const login = ({ login, password }: LoginFormData) => {
    loginService
      .login({
        login: login,
        password: password,
      })
      .then((user: User | undefined) => {
        if (user) {
          dispatch(loginUser(user));
          navigate('/');
        }
      })
      .catch(() => {
        alert('The username or password is incorrect');
      });
  };

  return (
    <div>
      <form className={style.login_form} onSubmit={handleSubmit((data) => login(data))}>
        <p className={style.login_form_text}>Log in to your account</p>
        <input className={style.login_form_input} placeholder="login" {...register('login')} />
        <p className={style.red}>{errors.login?.message}</p>
        <input className={style.login_form_input} type="password" placeholder="Password" {...register('password')} />
        <p className={style.red}>{errors.password?.message}</p>
        <button type="submit" className={style.login_form_input + ' ' + style.login_form_btn}>
          Log In
        </button>
      </form>
    </div>
  );
};
