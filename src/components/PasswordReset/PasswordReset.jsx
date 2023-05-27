import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import smile from '../assets/img/smile.png';
import axios from 'axios';

import {
  setTokens,
  setLoading,
} from '../../redux/actions/passwordResetActions';

import styles from '../Registration/registration.css';
import s from './passwordReset.css';

const PasswordReset = () => {
  const [isFormFilled, setIsFormFilled] = useState(false);
  const dispatch = useDispatch();
  const { tokens, isLoading } = useSelector((state) => state.passwordReset);

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    onSubmit: async (values) => {
      dispatch(setLoading(true));

      try {
        const response = await axios.post('API_ENDPOINT', values);
        const data = response.data;
        dispatch(setTokens(data.tokens));
      } catch (error) {
        console.error('Ошибка при сбросе пароля:', error);
      }

      dispatch(setLoading(false));
    },
  });

  useEffect(() => {
    setIsFormFilled(!!formik.values.email);
  }, [formik.values.email]);

  return (
    <div className="form">
      <img src={smile} alt="Smile" />
      <h2>Сброс пароля</h2>
      <p className="description">
        На введенную вами почту мы отправим ссылку, перейдя по которой вы
        сможете сбросить пароль
      </p>
      <form onSubmit={formik.handleSubmit}>
        <div className="input-container">
          <input
            id="email-register"
            name="email"
            type="email"
            onChange={formik.handleChange}
            value={formik.values.email}
            placeholder=" "
          />
          <label htmlFor="email-register">Электронная почта</label>
        </div>

        <button
          type="submit"
          className={`submit-button ${isFormFilled ? 'filled' : ''}`}
          disabled={isLoading}
        >
          {isLoading ? 'Загрузка...' : 'Далее'}
        </button>
      </form>
    </div>
  );
};

export default PasswordReset;
