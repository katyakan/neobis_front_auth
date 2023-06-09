import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const Redirection = () => {
  const navigate = useNavigate();
  const { token } = useParams();

  useEffect(() => {
    navigate('/authapp://additionalInfo');
    window.location.href = `authapp://additionalInfo/${token}`;
  }, []);

  return <div></div>;
};
export default Redirection;
