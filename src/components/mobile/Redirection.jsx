import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Redirection = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/authapp://additionalInfo');
    window.location.href = 'authapp://additionalInfo?token={token}';
  }, []);

  return <div></div>;
};
export default Redirection;
