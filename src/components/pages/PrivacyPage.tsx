import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks/redux';
import HeaderLanding from '../Header/HeaderLanding';
import FooterLanding from '../Footer/FooterLanding';
import { Button } from 'antd';

const PrivacyPage = () => {
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
              {userId ? lang.privacyPage[35] : lang.privacyPage[0]}
            </span>{' '}
            / {lang.privacyPage[1]}
          </p>
        </div>
        <strong>{lang.privacyPage[2]}</strong>
        <p>{lang.privacyPage[3]}</p>
        <p>{lang.privacyPage[4]}</p>
        <p>{lang.privacyPage[5]}</p>
        <p>{lang.privacyPage[6]}</p>
        <p>
          <strong>{lang.privacyPage[7]}</strong>
        </p>{' '}
        <p>{lang.privacyPage[8]}</p>{' '}
        <div>
          <p>{lang.privacyPage[9]}</p> <p>{lang.privacyPage[10]}</p>{' '}
          <ul>
            <li>
              <a
                href="https://www.google.com/policies/privacy/"
                target="_blank"
                rel="noopener noreferrer"
              >
                {lang.privacyPage[11]}
              </a>
            </li>
          </ul>
        </div>{' '}
        <p>
          <strong>{lang.privacyPage[12]}</strong>
        </p>{' '}
        <p>{lang.privacyPage[13]}</p>{' '}
        <p>
          <strong>{lang.privacyPage[14]}</strong>
        </p>{' '}
        <p>{lang.privacyPage[15]}</p> <p>{lang.privacyPage[16]}</p>{' '}
        <p>
          <strong>{lang.privacyPage[17]}</strong>
        </p>{' '}
        <p>{lang.privacyPage[18]}</p>{' '}
        <ul>
          <li>{lang.privacyPage[19]}</li> <li>{lang.privacyPage[20]}</li>{' '}
          <li>{lang.privacyPage[21]}</li> <li>{lang.privacyPage[22]}</li>
        </ul>{' '}
        <p>{lang.privacyPage[23]}</p>{' '}
        <p>
          <strong>{lang.privacyPage[24]}</strong>
        </p>{' '}
        <p>{lang.privacyPage[25]}</p>{' '}
        <p>
          <strong>{lang.privacyPage[26]}</strong>
        </p>{' '}
        <p>{lang.privacyPage[27]}</p>{' '}
        <p>
          <strong>{lang.privacyPage[28]}</strong>
        </p>{' '}
        <div>
          <p>{lang.privacyPage[29]}</p>
        </div>{' '}
        <p>
          <strong>{lang.privacyPage[30]}</strong>
        </p>{' '}
        <p>{lang.privacyPage[31]}</p> <p>{lang.privacyPage[32]}</p>{' '}
        <p>
          <strong>{lang.privacyPage[33]}</strong>
        </p>{' '}
        <p>{lang.privacyPage[34]}</p>{' '}
        {userId && (
          <div className="flex justify-center my-10">
            <Button
              type="primary"
              size="large"
              onClick={() => navigate('/dashboard')}
            >
              {lang.privacyPage[35]}
            </Button>
          </div>
        )}
      </div>

      <FooterLanding />
    </>
  );
};

export default PrivacyPage;
