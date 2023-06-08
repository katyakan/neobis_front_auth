import React, { useState } from 'react';
import { Formik } from 'formik';
import smile from '../assets/img/smile.png';
import opened from '../assets/img/opened.png';
import closed from '../assets/img/closed.png';
import styles from './passwordSet.css';
import axios from 'axios';

const PasswordSet = () => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const handleFormSubmit = async (values, { setSubmitting }) => {
    try {
      await axios.put(
        'https://cors-anywhere.herokuapp.com/http://34.107.1.158/password-update/',
        values
      );

      console.log('Password updated successfully');
    } catch (error) {
      console.log('Error updating password:', error.message);
    }
    setSubmitting(false);
  };
  return (
    <div className="form">
      <img src={smile} alt="smile" />
      <Formik
        initialValues={{ password: '', confirmPassword: '' }}
        validate={(values) => {
          const errors = {};
          if (!values.password) {
            errors.password = 'Required';
          } else if (values.password.length < 8) {
            errors.password = 'Password must be at least 8 characters long';
          } else if (!/\d/.test(values.password)) {
            errors.password = 'Password must contain at least one number';
          } else if (!/[!@#$%^&*]/.test(values.password)) {
            errors.password =
              'Password must contain at least one special character';
          } else if (!/[A-Z]/.test(values.password)) {
            errors.password =
              'Password must contain at least one uppercase letter';
          }
          if (!values.confirmPassword) {
            errors.confirmPassword = 'Required';
          } else if (values.password !== values.confirmPassword) {
            errors.confirmPassword = 'Passwords do not match';
          }
          return errors;
        }}
        onSubmit={handleFormSubmit}
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
                name="password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
                placeholder=" "
              />
              <label htmlFor="password">Придумайте пароль</label>
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
            {errors.password && touched.password && errors.password}

            <div className="password-field input-container-password">
              <input
                type={showPassword ? 'text' : 'password'}
                name="confirmPassword"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.confirmPassword}
                placeholder=" "
              />
              <label htmlFor="confirmPassword">Повторите пароль</label>
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
            {errors.confirmPassword &&
              touched.confirmPassword &&
              errors.confirmPassword}
            <div className="matches">
              {' '}
              <li className={values.password.match(/[0-9]/) ? 'blue' : ''}>
                Пароль содержит цифры
              </li>
              <li className={values.password.match(/[!@#$%^&*]/) ? 'blue' : ''}>
                пароль содержит Специальные символы
              </li>
              <li className={values.password.match(/[A-Z]/) ? 'blue' : ''}>
                пароль содержит заглавные буквы
              </li>
              <li
                className={
                  values.password === values.confirmPassword && values.password
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
                values.confirmPassword === values.password ? 'filled' : ''
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

export default PasswordSet;
