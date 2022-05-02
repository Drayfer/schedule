import { Row } from 'antd';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks/redux';
import Header from '../Header/Header';
import Schedule from '../Schedule/Schedule';
import SidebarMenu from '../SidebarMenu/SidebarMenu';

const Dashboard = () => {
  const { user } = useAppSelector((state) => state);
  const navigate = useNavigate();
  useEffect(() => {
    if (!user.data) {
      navigate('/');
    }
  }, [user]);
  return (
    <>
      <div className="flex w-screen">
        <SidebarMenu />

        <div className="bg-slate-200 overflow-auto h-screen w-full relative">
          <Header />
          {/* <div className="mt-14" /> */}
          <Schedule />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
