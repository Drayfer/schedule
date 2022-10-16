import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks/redux';
import Contacts from '../Settings/Contacts';

const FooterLanding = () => {
  const { lang } = useAppSelector((state) => ({
    lang: state.options.lang
  }));
  const navigate = useNavigate();

  return (
    <>
      <Contacts />
      <div className="w-full bg-[#111111] text-white text-xs p-4 pb-2 px-10">
        <div className="flex justify-between items-center flex-col-reverse tablet:flex-row">
          <div>© {lang.footer[0]}. T-App</div>
          <div className="flex phone:flex-col bigPhone:flex-row phone:mb-5 tablet:mb-0">
            <div
              className="cursor-pointer mr-2 underline hover:no-underline"
              onClick={() => navigate('/privacy')}
            >
              {lang.footer[1]}
            </div>
            <div
              className="cursor-pointer mr-2 underline hover:no-underline"
              onClick={() => navigate('/refund')}
            >
              {lang.footer[2]}
            </div>
            <div
              className="cursor-pointer underline hover:no-underline"
              onClick={() => navigate('/responsibility')}
            >
              {lang.footer[3]}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FooterLanding;
