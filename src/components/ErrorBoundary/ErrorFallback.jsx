import React from 'react';
import { useLogOut } from '../helpers/LogOut';
import { Button } from 'antd';
import { useAppSelector } from '../../hooks/redux';

const ErrorFallback = () => {
  const { lang } = useAppSelector((state) => ({
    lang: state.options.lang.errorPage
  }));
  const logout = useLogOut();

  const handleReload = () => {
    logout();
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-[#363740]">
      <div className="mb-6 text-slate-50 text-lg">{lang[0]}</div>
      <Button type="primary" onClick={handleReload}>
        {lang[1]}
      </Button>
    </div>
  );
};

export default ErrorFallback;
