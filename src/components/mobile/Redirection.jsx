import React, { useEffect } from 'react';

const Redirection = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/authapp://additionalInfo');
  }, [navigate]);

  return <div> </div>;
};

export default Redirection;
