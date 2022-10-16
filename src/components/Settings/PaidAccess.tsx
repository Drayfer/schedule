import React from 'react';
import { useAppSelector } from '../../hooks/redux';
import TarifCard from './TarifCard';

const PaidAccess = () => {
  const { lang, billing } = useAppSelector((state) => ({
    lang: state.options.lang?.price,
    billing: state.options.billing
  }));

  return (
    <>
      {!billing?.paidDays && (
        <div className="absolute top-0 left-0 w-full min-h-screen h-[1200px] z-[1] backdrop-blur-sm">
          <div
            className="bg-black/30 pt-10 pb-20 text-center w-full h-full"
            style={{ minHeight: 'inherit' }}
          >
            <p className="text-xl text-white font-extrabold">{lang[34]}</p>
            <TarifCard hideDemo={true} />
          </div>
        </div>
      )}
    </>
  );
};

export default PaidAccess;
