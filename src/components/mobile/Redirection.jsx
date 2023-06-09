import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const Redirection = () => {
  const navigate = useNavigate();
  const { token } = useParams();

  useEffect(() => {
    navigate('/authapp://additionalInfo');
    window.location.href = `authapp://additionalInfo/${token}`;
  }, [navigate, token]);

  return <div></div>;
};

export default Redirection;
