import { useEffect } from 'react';

const Redirect = () => {
  useEffect(() => {
    // Получаем текущий URL страницы
    const currentURL = window.location.href;

    // Извлекаем токен из текущего URL
    const url = new URL(currentURL);
    const token = url.searchParams.get('token');

    // Формируем URL для редиректа с токеном
    const redirectURL = ` authapp://registration?token=${token}`;
    //authapp://registration?token =  token
    // Выполняем редирект
    window.location.href = redirectURL;
  }, []);

  return <div></div>;
};

export default Redirect;
