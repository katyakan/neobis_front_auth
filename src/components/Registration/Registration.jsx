import React from 'react';
import { useFormik } from 'formik';
import smile from '../assets/img/smile.png';
import { useState, useEffect } from 'react';
import styles from './registration.css';

const Registration = () => {
  const [isFormFilled, setIsFormFilled] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });
  useEffect(() => {
    setIsFormFilled(!!formik.values.email);
  }, [formik.values.email]);
  return (
    <div className="form">
      <img src={smile} alt="Smile" />
      <h2>Регистрация</h2>
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

export default Registration;
