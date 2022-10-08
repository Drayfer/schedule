import React from 'react';
import { useNavigate } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import { useAppSelector } from '../../hooks/redux';
import LanguageSelectLanding from './LanguageSelectLanding';

const HeaderLanding = () => {
  const { lang } = useAppSelector((state) => ({
    lang: state.landing.lang
  }));

  const navigate = useNavigate();

  return (
    <div className="w-full flex justify-end bg-[#252525] text-white p-4 pb-2 px-10">
      <li className="flex w-[350px] justify-between">
        <ul>
          <HashLink
            className="text-white hover:text-zinc-200 underline hover:underline"
            to="/#price"
          >
            {lang.header[0]}
          </HashLink>
        </ul>
        <ul className="cursor-pointer underline">{lang.header[1]}</ul>
        <ul className="cursor-pointer underline">{lang.header[2]}</ul>
        <ul>
          <LanguageSelectLanding />
        </ul>
      </li>
    </div>
  );
};

export default HeaderLanding;
