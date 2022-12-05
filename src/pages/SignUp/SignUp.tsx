import style from './SignUp.module.css';
import * as yup from 'yup';
import { useTranslate } from '../../app/hooks';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { userService } from '../../services';
import { User } from '../../models';

const signupSchema = yup
  .object({
    name: yup.string().required('Required'),
    password: yup
      .string()
      .min(8, 'Too Short! Use 8 symbols and more.')
      .max(50, 'Too Long!')
      .required('Required'),
    login: yup.string().required('Required'),
  })
  .required();

type SignUpFormData = {
  password: string;
  login: string;
  name: string;
};

export const SignUp = () => {
  let navigate = useNavigate();
  const { t } = useTranslate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormData>({
    resolver: yupResolver(signupSchema),
  });

  const signup = ({ name, login, password }: SignUpFormData) => {
    userService
      .addUser({
        name: name,
        login: login,
        password: password,
      })
      .then((user: User | undefined) => {
        if (user) {
          navigate('/project-management-app/SignIn');
        }
      });
  };

  return (
    <div>
      <form className={style.login_form} onSubmit={handleSubmit(signup)}>
        <p className={style.login_form_text}>{t('signun').title}</p>
        <div>
          <input className={style.login_form_input} placeholder="Name" {...register('name')} />
        </div>
        <p className={style.red}>{errors.name?.message}</p>
        <div>
          <input className={style.login_form_input} placeholder="Login" {...register('login')} />
        </div>
        <p className={style.red}>{errors.login?.message}</p>
        <div>
          <input
            className={style.login_form_input}
            type="password"
            placeholder="Password"
            {...register('password')}
          />
        </div>
        <p className={style.red}>{errors.password?.message}</p>
        <button type="submit" className={style.login_form_input + ' ' + style.login_form_btn}>
          {t('signun').button}
        </button>
      </form>
    </div>
  );
};
