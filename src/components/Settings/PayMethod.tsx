import React, { ReactNode, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { Button, Divider, Drawer, Space } from 'antd';
import moment from 'moment';
import PaymentImg from '../../assets/images/payment/payment.webp';
import { getBilling } from '../../store/reducers/OptionsSlice';

interface IPayMethod {
  amount: number;
  children: ReactNode;
}

const PayMethod = (props: IPayMethod) => {
  const { amount, children } = props;
  const mainPage = window.location.pathname !== '/dashboard';
  const { lang, email, userId } = useAppSelector((state) => ({
    lang: state.options.lang,
    email: state.user.data?.email,
    userId: state.user.data?.id
  }));

  const [isPayMethod, setIsPayMethod] = useState(false);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleClick = async () => {
    if (mainPage) {
      navigate('/signup');
      return;
    }
    setIsPayMethod(true);
  };

  const handleUpdate = () => {
    if (userId) {
      dispatch(getBilling(userId));
      setIsPayMethod(false);
    }
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
                ? `https://t-app.diaka.ua/donate?amount=75&name=${email}&message=T-app%20Application%20${moment().format(
                    'DD.MM.YYYY HH:mm'
                  )}`
                : `https://t-app.diaka.ua/donate?amount=515&name=${email}&message=T-app%20Application%20${moment().format(
                    'DD.MM.YYYY HH:mm'
                  )}`
            }`}
          >
            Diaka
          </Button>

          <Divider />

          <div className="font-bold text-lg mb-4">{lang.price[42]}:</div>
          <div className="self-start">
            1. {lang.price[43]}: <span className="font-bold">{email}</span>
          </div>
          <img src={PaymentImg} alt="payment" />
          <div className="self-start mb-4">2. {lang.price[41]}:</div>
          <Button onClick={handleUpdate}>{lang.price[38]}</Button>
        </div>
      </Drawer>
    </>
  );
};

export default PayMethod;
