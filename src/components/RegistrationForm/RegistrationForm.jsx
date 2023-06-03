import React, { useState } from 'react';
import s from './registrationForm.css'; 
import smile from '../assets/img/smile.png';
import { Formik, Field, Form } from 'formik';

const RegistrationForm = () => {
  const [dateValue, setDateValue] = useState('');
  const [isDateSelected, setIsDateSelected] = useState(false);

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
        onSubmit={async (values) => {
          await new Promise((r) => setTimeout(r, 500));
          alert(JSON.stringify(values, null, 2));
        }}
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
            <Field id="email" name="email" placeholder=" " type="email" />
            <label htmlFor="email">Электронная почта</label>
          </div>
          <div className={`input-container ${isDateSelected ? 'filled' : ''}`}>
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
