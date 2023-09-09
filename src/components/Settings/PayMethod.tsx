import React, { ReactNode, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks/redux';
import { Button, Drawer, Space } from 'antd';
import moment from 'moment';

interface IPayMethod {
  amount: number;
  children: ReactNode;
}

const PayMethod = (props: IPayMethod) => {
  const { amount, children } = props;
  const mainPage = window.location.pathname !== '/dashboard';
  const { lang, email } = useAppSelector((state) => ({
    lang: state.options.lang,
    email: state.user.data?.email
  }));

  const [isPayMethod, setIsPayMethod] = useState(false);

  const navigate = useNavigate();

  const handleClick = async () => {
    if (mainPage) {
      navigate('/signup');
      return;
    }
    setIsPayMethod(true);
  };

  return (
    <>
      <div className="p-3 flex justify-center items-center">
        <div
          className="rounded-md bg-sky-400 text-white inline p-2 font-bold cursor-pointer"
          onClick={() => handleClick()}
        >
          {children}
        </div>
      </div>
      <Drawer
        title={lang.price[40]}
        width={390}
        onClose={() => setIsPayMethod(false)}
        visible={isPayMethod}
        bodyStyle={{ paddingBottom: 80 }}
        extra={
          <Space>
            <Button onClick={() => setIsPayMethod(false)}>
              {lang.disciplines[12]}
            </Button>
          </Space>
        }
      >
        <div className="flex flex-col items-center">
          <div className="text-xl mb-3 font-bold">
            {amount === 200 ? lang.price[14] : lang.price[25]}
          </div>
          <Button
            type="primary"
            size="large"
            target="_blank"
            href={`${
              amount === 200
                ? `https://t-app.diaka.ua/donate?amount=1&name=${email}&message=T-app%20Application%20${moment().format(
                    'DD.MM.YYYY HH:mm'
                  )}`
                : `https://t-app.diaka.ua/donate?amount=515&name=${email}&message=T-app%20Application%20${moment().format(
                    'DD.MM.YYYY HH:mm'
                  )}`
            }`}
          >
            Diaka
          </Button>
          <div className="mt-4 text-center">{lang.price[41]}</div>
        </div>
      </Drawer>
    </>
  );
};

export default PayMethod;
