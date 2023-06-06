import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import smile from '../assets/img/smile.png';
import axios from 'axios';
import styles from './registration.css';

const Registration = () => {
  const [isFormFilled, setIsFormFilled] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    onSubmit: async (values) => {
      try {
        const response = await axios.post(
          'http://34.107.1.158/auth/register/',
          {
            email: values.email,
          }
        );

        if (response.status === 200) {
          const data = response.data;
          console.log('Successful response:', data);
        } else {
          console.log('Error response:', response.data);
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
