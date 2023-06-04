import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import smile from '../assets/img/smile.png';
import axios from 'axios';
import styles from '../Registration/registration.css';
import s from './passwordReset.css';

import {
  setTokens,
  setLoading,
} from '../../redux/actions/passwordResetActions';

const PasswordReset = () => {
  const [isFormFilled, setIsFormFilled] = useState(false);
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    onSubmit: async (values) => {
      try {
        const response = await axios.post(
          'http://34.107.1.158/auth/password_reset/',
          values,
          {
            headers: {
              'Content-Type': 'application/json',
              'X-CSRFToken':
                '7fWplB0tjkVeq3giGoHzoUpnkURbLQl4ap09h4N3m4DFDNKszHx2VbsYLQwb5fUJ',
            },
          }
        );
        const data = response.data;
        console.log('Response:', data);
      } catch (error) {
        console.error('Error resetting password:', error);
      }
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
        >
          Далее
        </button>
      </form>
    </div>
  );
};

export default PasswordReset;
