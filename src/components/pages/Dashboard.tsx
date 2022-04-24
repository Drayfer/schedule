import { Row } from 'antd';
import React from 'react';
import Header from '../Header/Header';
import Schedule from '../Schedule/Schedule';
import SidebarMenu from '../SidebarMenu/SidebarMenu';

const Dashboard = () => {
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
