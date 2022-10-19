import { Button } from 'antd';
import React from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { getBilling } from '../../store/reducers/OptionsSlice';
import FooterLanding from '../Footer/FooterLanding';

import TarifCard from './TarifCard';

const NoDemoAccess = () => {
  const { userId, lang } = useAppSelector((state) => ({
    lang: state.options.lang.price,
    userId: state.user.data?.id
  }));
  const dispatch = useAppDispatch();

  return (
    <>
      <div className="min-h-screen">
        <div className="py-10 px-3 text-center">
          <p className="text-xl text-[#4d4d4d] font-bold">{lang[37]}</p>
          <TarifCard />
          <Button
            className="mt-4"
            onClick={() => userId && dispatch(getBilling(userId))}
          >
            {lang[38]}
          </Button>
        </div>
        <div className="w-full sticky bottom-0">
          <FooterLanding />
        </div>
      </div>
    </>
  );
};

export default NoDemoAccess;
