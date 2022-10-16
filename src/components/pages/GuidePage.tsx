import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks/redux';
import HeaderLanding from '../Header/HeaderLanding';
import FooterLanding from '../Footer/FooterLanding';
import Guide from '../Header/Guide';

const GuidePage = () => {
  let navigate = useNavigate();
  const { user } = useAppSelector((state) => state);
  const { lang } = useAppSelector((state) => ({
    lang: state.options.lang.guide
  }));

  useEffect(() => {
    if (user.data) {
      navigate('/dashboard');
    }
    window.scrollTo(0, 0);
    // eslint-disable-next-line
  }, []);
  return (
    <>
      <HeaderLanding />
      <div className="min-h-screen bg-[#252525] p-3 pt-12 text-center">
        <Guide landing={true} />
        <p
          className="text-white underline mt-3 cursor-pointer"
          onClick={() => navigate('/')}
        >
          {lang[11]}
        </p>
      </div>

      <FooterLanding />
    </>
  );
};

export default GuidePage;
