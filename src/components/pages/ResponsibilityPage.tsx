import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks/redux';
import HeaderLanding from '../Header/HeaderLanding';
import FooterLanding from '../Footer/FooterLanding';
import { Button } from 'antd';

const ResponsibilityPage = () => {
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
              {userId
                ? lang.responsibilityPage[45]
                : lang.responsibilityPage[0]}
            </span>{' '}
            / {lang.responsibilityPage[1]}
          </p>
        </div>
        <div>
          <p className="text-2xl">{lang.responsibilityPage[2]}</p>
          <b>{lang.responsibilityPage[3]}</b>
          <br />
          {lang.responsibilityPage[4]}
          <br />
          {lang.responsibilityPage[5]}
          <br />
          {lang.responsibilityPage[6]}
          <br />
          {lang.responsibilityPage[7]}
          <br />
          {lang.responsibilityPage[8]}
          <br />
          {lang.responsibilityPage[9]}
          <br />
          {lang.responsibilityPage[10]}
          <br />
          {lang.responsibilityPage[11]}
          <br />
          <b>{lang.responsibilityPage[12]}</b>
          <br />
          {lang.responsibilityPage[13]}
          <br />
          {lang.responsibilityPage[14]}
          <br />
          {lang.responsibilityPage[15]}
          <br />
          {lang.responsibilityPage[16]}
          <br />
          {lang.responsibilityPage[17]}
          <br />
          <b>{lang.responsibilityPage[18]}</b>
          <br />
          {lang.responsibilityPage[19]}
          <br />
          {lang.responsibilityPage[20]}
          <br />
          {lang.responsibilityPage[21]}
          <br />
          {lang.responsibilityPage[22]}
          <br />
          {lang.responsibilityPage[23]}
          <br />
          {lang.responsibilityPage[24]}
          <br />
          {lang.responsibilityPage[25]}
          <br />
          {lang.responsibilityPage[26]}
          <br />
          {lang.responsibilityPage[27]}
          <br />
          <b>{lang.responsibilityPage[28]}</b>
          <br />
          {lang.responsibilityPage[29]}
          <br />
          {lang.responsibilityPage[30]}
          <br />
          {lang.responsibilityPage[31]}
          <br />
          {lang.responsibilityPage[32]}
          <br />
          <b>{lang.responsibilityPage[33]}</b>
          <br />
          {lang.responsibilityPage[34]}
          <br />
          {lang.responsibilityPage[35]}
          <br />
          {lang.responsibilityPage[36]}
          <br />
          {lang.responsibilityPage[37]}
          <br />
          {lang.responsibilityPage[38]}
          <br />
          {lang.responsibilityPage[39]}
          <br />
          <p className="text-2xl mt-5 my-2">{lang.responsibilityPage[40]}</p>
          <br />
          {lang.responsibilityPage[41]}
          <br />
          {lang.responsibilityPage[42]}
          <br />
          {lang.responsibilityPage[43]}
          <br />
          {lang.responsibilityPage[44]}
        </div>
        {userId && (
          <div className="flex justify-center my-10">
            <Button
              type="primary"
              size="large"
              onClick={() => navigate('/dashboard')}
            >
              {lang.responsibilityPage[45]}
            </Button>
          </div>
        )}
      </div>

      <FooterLanding />
    </>
  );
};

export default ResponsibilityPage;
