import React, { useState } from 'react';
import styles from './login.css';
import smile from '../assets/img/smile.png';
import closed from '../assets/img/closed.png';
import opened from '../assets/img/opened.png';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Link } from 'react-router-dom';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFormFilled, setIsFormFilled] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleInputChange = (e) => {
    setIsFormFilled(e.target.value !== '');
  };

  const handleFormSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await fetch(
        'https://cors-anywhere.herokuapp.com/http://34.107.1.158/auth/login/',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
        }
      );

      if (response.ok) {
        const data = await response.json();
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message);
      }
    } catch (error) {
      setErrorMessage('An error occurred');
    }

    setSubmitting(false);
  };
  return (
    <div className="form">
      <img src={smile} alt="Smile" />
      <Formik
        initialValues={{ email: '', password: '' }}
        validate={(values) => {}}
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
            <div className="input-container">
              <input
                type="email"
                name="email"
                id="email"
                onChange={(e) => {
                  handleInputChange(e);
                  handleChange(e);
                }}
                onBlur={handleBlur}
                value={values.email}
                placeholder=" "
              />
              <label htmlFor="email">Электронная почта!!!</label>
            </div>
            {/* Error message */}
            {errors.email && touched.email && errors.email}

            {/* Password field */}
            <div className="password-field input-container-password">
              {/* Password input */}
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                onChange={(e) => {
                  handleInputChange(e);
                  handleChange(e);
                }}
                onBlur={handleBlur}
                value={values.password}
                placeholder=" "
              />
              <label htmlFor="password">Пароль</label>
              {/* Toggle password visibility button */}
              <button
                type="button"
                className="toggle-password"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? '🕶️' : '👓'}
              </button>
            </div>
            {/* Forgot password link */}

            <Link to="/passwordreset">Забыли пароль?</Link>
            {/* Password error message */}
            {errors.password && touched.password && errors.password}
            {errorMessage && (
              <div className="error-message">Неверный логин или пароль</div>
            )}
            {/* Submit button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={`submit-button ${isFormFilled ? 'filled' : ''}`}
            >
              Войти
            </button>
          </form>
        )}
      </Formik>
      <Link to="/registration">Начать пользоваться</Link>
    </div>
  );
};

export default Login;
