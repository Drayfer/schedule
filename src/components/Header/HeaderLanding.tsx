import React from 'react';
import { useNavigate } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import { useAppSelector } from '../../hooks/redux';
import LanguageSelectLanding from './LanguageSelectLanding';

const HeaderLanding = () => {
  const { lang } = useAppSelector((state) => ({
    lang: state.options.lang
  }));

  const navigate = useNavigate();

  return (
    <div className="w-full flex justify-end bg-[rgb(37,37,37)] text-white p-4 pb-2 px-10">
      <ul className="flex w-[350px] justify-between text-sm">
        <li
          className="cursor-pointer underline hover:no-underline"
          onClick={() => navigate('/')}
        >
          {lang.header[3]}
        </li>
        <li>
          <HashLink
            className="text-white underline hover:text-white"
            to="/#price"
          >
            {lang.header[0]}
          </HashLink>
        </li>
        <li>
          <HashLink
            className="cursor-pointer text-white underline hover:text-white"
            to="#contacts"
          >
            {lang.header[1]}
          </HashLink>
        </li>
        <li
          className="cursor-pointer underline hover:no-underline"
          onClick={() => navigate('/guide')}
        >
          {lang.header[2]}
        </li>
        <li>
          <LanguageSelectLanding />
        </li>
      </ul>
    </div>
  );
};

export default HeaderLanding;
