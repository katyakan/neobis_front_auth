import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import smile from '../assets/img/smile.png';
import styles from './passwordReset.css';
import axios from 'axios';

const PasswordReset = () => {
  const [isFormFilled, setIsFormFilled] = useState(false);
  const [isRequestSuccessful, setIsRequestSuccessful] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    onSubmit: async (values) => {
      try {
        const response = await axios.post(
          'https://cors-anywhere.herokuapp.com/http://34.107.1.158/password_reset/',
          { email: values.email },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        if (response.status === 200) {
          setIsRequestSuccessful(true);
          console.log('Successful response:', response.data);
        } else {
          console.log('Error response:', response.data);
        }
      } catch (error) {
        console.log('Axios error:', error);
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
      {isRequestSuccessful ? (
        <p>Мы отправили вам письмо на почту.</p>
      ) : (
        <form onSubmit={formik.handleSubmit}>
          <p className="description">
            На введенную вами почту мы отправим ссылку, перейдя по которой вы
            сможете сбросить пароль
          </p>
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
      )}
    </div>
  );
};

export default PasswordReset;
