import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import smile from '../assets/img/smile.png';
import styles from './registration.css';

const Registration = () => {
  const [isFormFilled, setIsFormFilled] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    onSubmit: async (values) => {
      try {
        const response = await fetch('https://34.107.1.158/auth/register/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email: values.email }),
        });

        if (response.ok) {
          const data = await response.json();
          console.log('Successful response:', data);
        } else {
          const errorData = await response.json();
          console.log('Error response:', errorData);
        }
      } catch (error) {
        console.log('Fetch error:', error);
      }
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
