import React, { useCallback } from 'react';
import style from './SignUp.module.css';
import * as yup from 'yup';
import { useTranslate, useAppDispatch } from '../../app/hooks';
import { openModal } from '../../features/modals/modalsSlice';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { userService } from '../../services';
import { loginUser } from '../../app/reducers/user';
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

type ChangeFormData = {
  password: string;
  login: string;
  name: string;
  userId: string,
};

const Profile = () => {
  let navigate = useNavigate();
  const { t } = useTranslate();
  const id = useParams()
  const dispatch = useAppDispatch()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ChangeFormData>({
    resolver: yupResolver(signupSchema),
  });

  const changeData = ({ name, login, password }: ChangeFormData) => {
    userService
      .changeUserData({
        name: name,
        login: login,
        password: password,
        userId: id,
      })
      .then((user: User | undefined) => {
        if (user) {
          dispatch(loginUser({user}));
          navigate('/');
        }
      });
  };

  const callbacks = {
    onCancel: useCallback(() => navigate('/'), [navigate]),
    onDelete: useCallback(() =>  dispatch(openModal({type: 'conformationModal', 
        info: { operation: 'delete-user', ids: { boardId: 'idle', columnId: 'idle', userId: id.id } }})), [dispatch, id]),
  }

  return (
    <div>
      <form className={style.login_form} onSubmit={handleSubmit(changeData)}>
        <p className={style.login_form_text}>{t('profile_form').title}</p>
        <div>
          <input id={'changeName'} className={style.login_form_input} {...register('name')} placeholder={t('profile_form').new_name}/>
        </div>
        <span className={style.red}>{errors.name?.message}</span>
        <div>
          <input id='changeLogin' className={style.login_form_input} placeholder={t('profile_form').new_login} {...register('login')} />
        </div>
        <span className={style.red}>{errors.login?.message}</span>
        <div>
          <input
            className={style.login_form_input}
            type="password"
            placeholder={t('profile_form').new_password}
            {...register('password')}
          />
        </div>
        <span className={style.red}>{errors.password?.message}</span>
        <div className={style.login_form_footer}>
            <button type="button" className={style.login_form_input + ' ' + style.login_form_btn} onClick={callbacks.onCancel}>
                {t('profile_form').button_abort}
            </button>
            <button type="submit" className={style.login_form_input + ' ' + style.login_form_btn}>
            {t('profile_form').button_change}
            </button>
        </div>
        <span className={style.login_form_delete_user} onClick={callbacks.onDelete}>
            {t('profile_form').delete}
      </span>
      </form>
    </div>
  );
};

export default React.memo(Profile)
