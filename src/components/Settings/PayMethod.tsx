import React, { ReactNode, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks/redux';
import axios from 'axios';
import { getTokenHeader } from '../helpers/getTokenHeader';
import { initializePaddle, Paddle } from '@paddle/paddle-js';
import { Spin } from 'antd';

interface IPayMethod {
  children: ReactNode;
  period: 'month' | 'year';
}

interface Transaction {
  id: string;
  items: Array<{
    price: {
      id: string;
      customData?: {
        period: 'month' | 'year';
      };
    };
  }>;
  details: {
    lineItems: Array<{
      priceId: string;
    }>;
  };
}

const PayMethod = (props: IPayMethod) => {
  const { period, children } = props;
  const mainPage = window.location.pathname !== '/dashboard';
  const { email, userId } = useAppSelector((state) => ({
    email: state.user.data?.email,
    userId: state.user.data?.id
  }));

  const [loading, setLoading] = useState(false);
  const [paddle, setPaddle] = useState<Paddle | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const token = process.env.REACT_APP_PADDLE_CLIENT_TOKEN || '';
    const environment = token.includes('live_') ? 'production' : 'sandbox';

    initializePaddle({
      environment,
      token
    }).then((paddle) => {
      if (paddle) {
        setPaddle(paddle);
      }
    });
  }, []);

  const handleClick = async () => {
    if (mainPage) {
      navigate('/signup');
      return;
    }

    try {
      setLoading(true);
      const response = await axios.get<Transaction>(
        `${process.env.REACT_APP_API_URL}/billing/prices`,
        getTokenHeader()
      );

      const { details, items } = response.data;

      const lineItemIndex = items.findIndex(
        (i) => i.price.customData?.period === period
      );
      const lineItem = details.lineItems[lineItemIndex];

      if (lineItem && paddle && email) {
        paddle.Checkout.open({
          items: [{ priceId: lineItem.priceId }],
          customer: {
            email: email
          },
          settings: {
            displayMode: 'overlay',
            theme: 'light',
            allowLogout: false,
            successUrl: `${window.location.origin}/success-payment`
          },
          customData: {
            userId,
            period
          }
        });
      }
    } catch (error) {
      console.error('Failed to process Paddle payment:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-3 flex justify-center items-center">
      <div
        className="rounded-md bg-sky-400 text-white inline p-2 font-bold cursor-pointer"
        onClick={() => handleClick()}
      >
        {loading && <Spin size="small" style={{ marginRight: '8px' }} />}
        {children}
      </div>
    </div>
  );
};

export default PayMethod;
