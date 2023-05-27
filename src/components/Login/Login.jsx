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

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleInputChange = (e) => {
    setIsFormFilled(e.target.value !== '');
  };

  return (
    <div className="form">
      <img src={smile} alt="Smile" />
      <Formik
        initialValues={{ email: '', password: '' }}
        validate={(values) => {
          const errors = {};
          if (!values.email) {
            /*{errors.email = 'Required';}*/
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            /*{errors.email = 'Invalid email address';}*/
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
        }}
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
              <label htmlFor="email">Электронная почта</label>
            </div>

            {errors.email && touched.email && errors.email}

            <div className="password-field input-container-password">
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
              <button
                type="button"
                className="toggle-password"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? '🕶️' : '👓'}
              </button>
            </div>
            <a href="#">Забыли пароль?</a>
            {errors.password && touched.password && errors.password}
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
