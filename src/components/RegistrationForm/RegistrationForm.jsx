import React, { useState, useEffect } from 'react';
import { useParams, Redirect } from 'react-router-dom';
import s from './registrationForm.css';
import smile from '../assets/img/smile.png';
import { Formik, Field, Form } from 'formik';
import { Navigate } from 'react-router-dom';

const RegistrationForm = () => {
  const [dateValue, setDateValue] = useState('');
  const [isDateSelected, setIsDateSelected] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);

  const { token } = useParams();

  useEffect(() => {
    const checkToken = async () => {
      try {
        const response = await fetch(
          `https://cors-anywhere.herokuapp.com/http://34.107.1.158/auth/check-token/${token}`
        );
        if (response.ok) {
          setIsRegistered(true);
        } else {
          setIsRegistered(false);
        }
      } catch (error) {
        setIsRegistered(false);
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
    const { firstName, lastName, email } = values;
    const isFilled = firstName && lastName && email && dateValue;
    setIsDateSelected(isFilled);
  };

  const handleRegistration = async (values) => {
    try {
      const response = await fetch(
        'https://cors-anywhere.herokuapp.com/http://34.107.1.158/auth/register-update/',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
        }
      );

      if (response.ok) {
        alert('Registration successful!');
        setIsRegistered(true);
      } else {
        alert('Registration failed. Please try again.');
      }
    } catch (error) {
      alert('Registration failed. Please try again.');
    }
  };

  if (isRegistered) {
    return <Navigate to="/passwordset" />;
  }

  return (
    <div className="form">
      <img src={smile} alt="smile" />
      <h2>Регистрация</h2>
      <Formik
        initialValues={{
          firstName: '',
          lastName: '',
          email: '',
          date: '',
        }}
        onSubmit={handleRegistration}
        onChange={handleFormChange}
      >
        <Form className="registration-form">
          <div className="input-container">
            <Field id="firstName" name="firstName" placeholder=" " />
            <label htmlFor="firstName">Имя</label>
          </div>
          <div className="input-container">
            <Field id="lastName" name="lastName" placeholder=" " />
            <label htmlFor="lastName">Фамилия</label>
          </div>
          <div className="input-container">
            <Field
              id="date"
              name="date"
              placeholder=" "
              type="date"
              value={dateValue}
              onChange={handleDateChange}
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
      </Formik>
    </div>
  );
};

export default RegistrationForm;
