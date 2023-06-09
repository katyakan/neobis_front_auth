import React, { useState } from 'react';
import { Formik } from 'formik';
import smile from '../assets/img/smile.png';
import opened from '../assets/img/opened.png';
import closed from '../assets/img/closed.png';
import styles from './passwordresetconfirm.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const PasswordResetConfirm = () => {
  const { token, uid } = useParams();
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    console.log('Form values:', values);
    try {
      const response = await axios.post(
        `https://cors-anywhere.herokuapp.com/http://34.107.1.158/passwordresetconfirm/${uid}/${token}/`,
        {
          token,
          uid,
          new_password1: values.new_password1,
        }
      );

      console.log(response.data);
      setSubmitting(false);
    } catch (error) {
      console.error(error);
      setSubmitting(false);
    }
  };

  return (
    <div className="form">
      <img src={smile} alt="smile" />
      <Formik
        initialValues={{ new_password1: '', new_password2: '' }}
        validate={(values) => {
          const errors = {};
          if (!values.new_password1) {
            errors.new_password1 = 'Required';
          } else if (values.new_password1.length < 8) {
            errors.new_password1 =
              'Password must be at least 8 characters long';
          } else if (!/\d/.test(values.new_password1)) {
            errors.new_password1 = 'Password must contain at least one number';
          } else if (!/[!@#$%^&*]/.test(values.new_password1)) {
            errors.new_password1 =
              'Password must contain at least one special character';
          } else if (!/[A-Z]/.test(values.new_password1)) {
            errors.new_password1 =
              'Password must contain at least one uppercase letter';
          }
          if (!values.new_password2) {
            errors.new_password2 = 'Required';
          } else if (values.new_password1 !== values.new_password2) {
            errors.new_password2 = 'Passwords do not match';
          }
          return errors;
        }}
        onSubmit={handleSubmit}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => (
          <form onSubmit={handleSubmit}>
            <div className="password-field input-container-password">
              <input
                type={showPassword ? 'text' : 'password'}
                name="new_password1"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.new_password1}
                placeholder=" "
              />
              <label htmlFor="new_password1">Придумайте пароль</label>
              <button
                type="button"
                className="toggle-password"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? (
                  <img className="eye" src={closed} alt="password unshown" />
                ) : (
                  <img className="eye" src={opened} alt="password shown" />
                )}
              </button>
            </div>
            {errors.new_password1 &&
              touched.new_password1 &&
              errors.new_password1}

            <div className="password-field input-container-password">
              <input
                type={showPassword ? 'text' : 'password'}
                name="new_password2"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.new_password2}
                placeholder=" "
              />
              <label htmlFor="new_password2">Повторите пароль</label>
              <button
                type="button"
                className="toggle-password"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? (
                  <img className="eye" src={closed} alt="password unshown" />
                ) : (
                  <img className="eye" src={opened} alt="password shown" />
                )}
              </button>
            </div>
            {errors.new_password2 &&
              touched.new_password2 &&
              errors.new_password2}
            <div className="matches">
              {' '}
              <li className={values.new_password1.match(/[0-9]/) ? 'blue' : ''}>
                Пароль содержит цифры
              </li>
              <li
                className={
                  values.new_password1.match(/[!@#$%^&*]/) ? 'blue' : ''
                }
              >
                пароль содержит Специальные символы
              </li>
              <li className={values.new_password1.match(/[A-Z]/) ? 'blue' : ''}>
                пароль содержит заглавные буквы
              </li>
              <li
                className={
                  values.new_password1 === values.new_password2 &&
                  values.new_password1
                    ? 'blue'
                    : ''
                }
              >
                пароли совпадают
              </li>
            </div>

            <button
              type="submit"
              className={`submit-button ${
                values.new_password2 === values.new_password1 ? 'filled' : ''
              }`}
              disabled={isSubmitting}
            >
              Далее
            </button>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default PasswordResetConfirm;

