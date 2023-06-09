import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Redirection = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.location.href = 'authapp://additionalInfo';
  }, []);

  return <div></div>;
};

export default Redirection;
