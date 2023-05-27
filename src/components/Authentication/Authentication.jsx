import React, { useState, useEffect } from 'react';
import authentication from './authentication.css';
import smile from '../assets/img/smile.png';

const Authentication = () => {
  const [timer, setTimer] = useState(59);
  const [showRetryButton, setShowRetryButton] = useState(false);
  useEffect(() => {
    let interval;

    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else {
      setShowRetryButton(true);
    }

    return () => {
      clearInterval(interval);
    };
  }, [timer]);

  // отправить запрос заново
  const handleRetryRequest = () => {
    setShowRetryButton(false);
    setTimer(59);
  };

  const formatTimer = (value) => {
    return value < 10 ? `0${value}` : value;
  };

  return (
    <div className="form">
      <img src={smile} alt="Smile" />
      <h2>Мы отправили письмо с подтверждением на почту</h2>
      {timer > 0 && (
        <p className="repeat_text">
          Повторный запрос <br /> ↻ 00:{formatTimer(timer)}
        </p>
      )}
      {showRetryButton ? (
        <button onClick={handleRetryRequest}>
          <p className="repeat_button">Повторить запрос</p>
        </button>
      ) : null}
    </div>
  );
};

export default Authentication;
