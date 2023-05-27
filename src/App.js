import React from 'react';
import Login from './components/Login/Login';
import Registration from './components/Registration/Registration';
import Authentication from './components/Authentication/Authentication';

import { Route, Routes } from 'react-router-dom';
import './App.css';
import RegistrationForm from './components/RegistrationForm/RegistrationForm';
import PasswordSet from './components/PasswordSet/PasswordSet';
import PasswordReset from './components/PasswordReset/PasswordReset';

function App() {
  return (
    <>
      <div>
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/registration" element={<Registration />}></Route>
          <Route path="/authentication" element={<Authentication />}></Route>
          <Route
            path="/registrationform"
            element={<RegistrationForm />}
          ></Route>
          <Route path="/passwordset" element={<PasswordSet />}></Route>
          <Route path="/passwordreset" element={<PasswordReset />}></Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
