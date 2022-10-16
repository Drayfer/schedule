import React from 'react';
import { useAppSelector } from '../../hooks/redux';

const PaidPeriodInfo = () => {
  const { lang, billing } = useAppSelector((state) => ({
    lang: state.options.lang.price,
    billing: state.options.billing
  }));

  return (
    <>
      {billing?.paidDays ? (
        <div className="flex justify-center mb-4">
          <div className="w-[320px] rounded-md p-2 text-center bg-green-400/20">
            {lang[39]} {billing.paidDays} {lang[36]}
          </div>
        </div>
      ) : null}
    </>
  );
};

export default PaidPeriodInfo;
