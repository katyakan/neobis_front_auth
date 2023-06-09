import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const Redirection = () => {
  const navigate = useNavigate();
  const { token } = useParams();

  useEffect(() => {
    const redirectUrl = `authapp://additionalInfo/${token}`;
    navigate('/authapp://additionalInfo');
    window.location.href = redirectUrl;
  }, [navigate, token]);

  return <div></div>;
};

export default Redirection;
