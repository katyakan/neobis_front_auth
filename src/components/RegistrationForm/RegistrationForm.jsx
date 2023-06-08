import React, { useState, useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import s from './registrationForm.css';
import smile from '../assets/img/smile.png';
import { Formik, Field, Form } from 'formik';

const RegistrationForm = () => {
  const [dateValue, setDateValue] = useState('');
  const [isDateSelected, setIsDateSelected] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [error, setError] = useState(null);

  const { token } = useParams();

  useEffect(() => {
    const checkToken = async () => {
      try {
        const urlParams = new URLSearchParams(window.location.search);
        const tokenParam = urlParams.get('token');

        const response = await fetch(
          `http://34.107.1.158/auth/register-update/`,
          {
            headers: {
              Authorization: `Bearer ${tokenParam}`,
            },
          }
        );

        if (response.ok) {
          setIsRegistered(true);
        } else if (response.status === 401) {
          setError('Unauthorized: Invalid token');
        } else {
          setError('Registration request failed');
        }
      } catch (error) {
        setError('Registration request failed');
      }
    };

    if (token) {
      checkToken();
    }
  }, [token]);

  const handleDateChange = (e) => {
    const value = e.target.value;
    setDateValue(value);
    setIsDateSelected(!!value);
  };

  const handleFormChange = (values) => {
    const { firstName, lastName, phone, date } = values;
    const isFilled = firstName && lastName && phone && date;
    setIsDateSelected(isFilled);
  };

  const handleRegistration = async (values) => {
    try {
      const response = await fetch(
        `http://34.107.1.158/auth/register-update/`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(values),
        }
      );

      if (response.ok) {
        alert('Registration successful!');
        setIsRegistered(true);
      } else {
        setError('Registration failed. Please try again.');
      }
    } catch (error) {
      setError('Registration failed. Please try again.');
    }
  };

  if (isRegistered) {
    return <Navigate to="/passwordset" />;
  }

  return (
    <div className="form">
      <img src={smile} alt="smile" />
      <h2>Регистрация</h2>
      {error && <p>{error}</p>}
      <Formik
        initialValues={{
          firstName: '',
          lastName: '',
          phone: '',
          date: '',
        }}
        onSubmit={handleRegistration}
      >
        {({ values, handleChange }) => (
          <Form className="registration-form">
            <div className="input-container">
              <Field
                id="firstName"
                name="firstName"
                placeholder=" "
                onChange={handleChange}
              />
              <label htmlFor="firstName">Имя</label>
            </div>
            <div className="input-container">
              <Field
                id="lastName"
                name="lastName"
                placeholder=" "
                onChange={handleChange}
              />
              <label htmlFor="lastName">Фамилия</label>
            </div>
            <div className="input-container">
              <Field
                id="phone"
                name="phone"
                placeholder=" "
                onChange={handleChange}
              />
              <label htmlFor="phone">Номер телефона</label>
            </div>
            <div className="input-container">
              <Field
                id="date"
                name="date"
                placeholder=" "
                type="date"
                value={values.date}
                onChange={handleChange}
              />
              <label htmlFor="date">Дата рождения</label>
            </div>

            <button
              type="submit"
              className={`submit-button ${isDateSelected ? 'filled' : ''}`}
            >
              Регистрация
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default RegistrationForm;
