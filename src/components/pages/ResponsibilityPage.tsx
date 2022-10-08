import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks/redux';
import HeaderLanding from '../Header/HeaderLanding';
import FooterLanding from '../Footer/FooterLanding';
import styled from 'styled-components';

const ResponsibilityPage = () => {
  let navigate = useNavigate();
  const { user } = useAppSelector((state) => state);
  const { lang } = useAppSelector((state) => ({
    lang: state.landing.lang
  }));

  useEffect(() => {
    if (user.data) {
      navigate('/dashboard');
    }
    // eslint-disable-next-line
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <HeaderLanding />
      <div className="min-h-screen bg-slate-100 p-6 pt-12 px-10">
        <div className="text-left text-lg pb-8">
          <p>
            <span
              className="underline cursor-pointer font-bold"
              onClick={() => navigate('/')}
            >
              {lang.responsibilityPage[0]}
            </span>{' '}
            / {lang.responsibilityPage[1]}
          </p>
        </div>
        <div>
          <p className="text-2xl">{lang.responsibilityPage[2]}</p>
          <b>{lang.responsibilityPage[3]}</b>
          <br />
          <Pre>{lang.responsibilityPage[4]}</Pre>
          <br />
          <b>{lang.responsibilityPage[5]}</b>
          <br />
          <Pre>{lang.responsibilityPage[6]}</Pre>
          <br />
          <b>{lang.responsibilityPage[7]}</b>
          <br />
          <Pre>{lang.responsibilityPage[8]}</Pre>
          <br />
          <b>{lang.responsibilityPage[9]}</b>
          <br />
          <Pre>{lang.responsibilityPage[10]}</Pre>
          <br />
          <p className="text-2xl mt-5 mb-1">{lang.responsibilityPage[11]}</p>
          <br />
          <Pre>{lang.responsibilityPage[12]}</Pre>
          <br />
          <p className="text-2xl mt-5 mb-1">{lang.responsibilityPage[13]}</p>
          <br />
          <Pre>{lang.responsibilityPage[14]}</Pre>
        </div>
      </div>

      <FooterLanding />
    </>
  );
};

export default ResponsibilityPage;

const Pre = styled('pre')`
  font-family: 'Poppins', sans-serif; ;
`;
