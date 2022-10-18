import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks/redux';
import HeaderLanding from '../Header/HeaderLanding';
import FooterLanding from '../Footer/FooterLanding';
import { Button } from 'antd';

const RefundPage = () => {
  let navigate = useNavigate();
  const { lang, userId } = useAppSelector((state) => ({
    lang: state.options.lang,
    userId: state.user.data?.id
  }));

  useEffect(() => {
    window.scrollTo(0, 0);
    // eslint-disable-next-line
  }, []);
  return (
    <>
      {!userId && <HeaderLanding />}
      <div className="min-h-screen bg-slate-100 p-6 pt-12 px-10">
        <div className="text-left text-lg pb-8">
          <p>
            <span
              className="underline cursor-pointer font-bold"
              onClick={() => navigate('/')}
            >
              {userId ? lang.refundPage[6] : lang.refundPage[0]}
            </span>{' '}
            / {lang.refundPage[1]}
          </p>
        </div>
        <p>{lang.refundPage[2]}</p>

        <p>{lang.refundPage[3]}</p>
        <p>{lang.refundPage[4]}</p>
        <p>{lang.refundPage[5]}</p>
        {userId && (
          <div className="flex justify-center my-10">
            <Button
              type="primary"
              size="large"
              onClick={() => navigate('/dashboard')}
            >
              {lang.refundPage[6]}
            </Button>
          </div>
        )}
      </div>

      <FooterLanding />
    </>
  );
};

export default RefundPage;
