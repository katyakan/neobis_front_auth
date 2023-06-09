import React, { useState } from 'react';
import styles from './project.css';
import smile from '../assets/img/smile.png';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Link, useNavigate } from 'react-router-dom';

const Project = () => {
  const navigate = useNavigate();
  const { token } = useParams();
  const handleLogout = async () => {
    try {
      await axios.post(
        'https://cors-anywhere.herokuapp.com/http://34.107.1.158/logout/',
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log('Logout successful');
      navigate('/');
    } catch (error) {
      console.log('Error during logout:', error.message);
    }
  };

  return (
    <div className="form">
      <img src={smile} alt="Smile" />
      <p>вы вошли в это чудесное приложение</p>
      <p>Чтобы выйти из него нажмите на эту кнопку</p>

      <button type="submit" onClick={handleLogout}>
        Выхожу из чудесного приложения
      </button>
    </div>
  );
};

export default Project;
