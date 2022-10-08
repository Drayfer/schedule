import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks/redux';

const FooterLanding = () => {
  const { lang } = useAppSelector((state) => ({
    lang: state.landing.lang
  }));
  const navigate = useNavigate();

  return (
    <div className="w-full bg-[#111111] text-white text-xs p-4 pb-2 px-10">
      <li className="flex justify-between items-center">
        <ul className="cursor-pointer">© {lang.footer[0]}. T-App</ul>
        <div className="flex">
          <ul
            className="cursor-pointer mr-2 underline"
            onClick={() => navigate('/privacy')}
          >
            {lang.footer[1]}
          </ul>
          <ul
            className="cursor-pointer mr-2 underline"
            onClick={() => navigate('/refund')}
          >
            {lang.footer[2]}
          </ul>
          <ul
            className="cursor-pointer underline"
            onClick={() => navigate('/responsibility')}
          >
            {lang.footer[3]}
          </ul>
        </div>
      </li>
    </div>
  );
};

export default FooterLanding;
