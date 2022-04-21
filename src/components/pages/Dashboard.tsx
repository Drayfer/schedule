import { Button, Divider } from 'antd';
import React from 'react';
import Logo from '../../assets/images/logo.png';
import Overview from '../../assets/images/overview.png';
import Students from '../../assets/images/students.png';
import { LeftCircleOutlined } from '@ant-design/icons';

const Dashboard = () => {
  return (
    <div className="flex">
      <div className="flex flex-col w-64 bg-dark h-screen">
        <div className="flex items-center justify-center pt-10 pb-16">
          <img src={Logo} alt="logo" className="w-8" />
          <h1 className="ml-3 font-semibold text-gray-500/70 text-lg pt-2">
            Dashboard Kit
          </h1>
        </div>

        <div className="flex justify-start items-center h-14 pl-20 border-l-4 border-white/0">
          <img
            src={Overview}
            alt="Overview"
            className="w-4 h-4 absolute left-8"
          />
          <div className="text-textMenu text-base font-normal">Schedule</div>
        </div>

        <div className="flex justify-start items-center h-14 pl-20 bg-white/5 border-l-4 border-white/50">
          <img
            src={Students}
            alt="Students"
            className="w-6 h-6 absolute left-8"
          />
          <div className="text-textMenu text-base font-normal">Students</div>
        </div>
        <div>
          <div
            style={{
              height: '1px',
              backgroundColor: 'white',
              margin: '40px 0',
              opacity: 0.2
            }}
          />
          <div className="absolute t-0 left-60 w-10 h-10">
            <LeftCircleOutlined className="text-lg text-slate-500" />
          </div>
        </div>

        <div className="flex justify-start items-center h-14 pl-20 border-l-4 border-white/0">
          <img
            src={Overview}
            alt="Overview"
            className="w-4 h-4 absolute left-8"
          />
          <div className="text-textMenu text-base font-normal">Settings</div>
        </div>
      </div>
      <div className="w-10/12">Overviev</div>
    </div>
  );
};

export default Dashboard;
