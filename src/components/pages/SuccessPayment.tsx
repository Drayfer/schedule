import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Result } from 'antd';
import { useAppSelector } from '../../hooks/redux';

const SuccessPayment: React.FC = () => {
  const navigate = useNavigate();
  const { lang } = useAppSelector((state) => ({
    lang: state.options.lang
  }));

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     navigate('/dashboard');
  //   }, 5000);

  //   return () => clearTimeout(timer);
  // }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Result
        status="success"
        title="Оплата прошла успешно!"
        subTitle="Ваша подписка активирована. Спасибо за покупку!"
        extra={[
          <Button
            type="primary"
            key="dashboard"
            onClick={() => navigate('/dashboard')}
          >
            Перейти в кабинет
          </Button>
        ]}
      />
    </div>
  );
};

export default SuccessPayment;
