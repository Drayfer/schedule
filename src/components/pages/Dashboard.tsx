import jwtDecode from 'jwt-decode';
import moment from 'moment';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import Footer from '../Footer/Footer';
import MainBoard from '../MainBoard/MainBoard';
import SidebarMenu from '../SidebarMenu/SidebarMenu';
import PushNotification from '../Schedule/PushNotification';
import { useLogOut } from '../helpers/LogOut';
import Notifications from '../Notifications/Notifications';
import TimerNotifications from '../Notifications/TimerNotifications';

const Dashboard = () => {
  const { user } = useAppSelector((state) => state);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const logout = useLogOut();

  useEffect(() => {
    if (user.data === null || !user.data.activate) {
      navigate('/login');
    }
    // eslint-disable-next-line
  }, [user.data]);

  useEffect(() => {
    if (user.data?.expToken) {
      const { exp } = jwtDecode<any>(user.data?.token || '');
      setTimeout(() => {
        logout();
      }, moment(exp).diff(moment().unix()) * 1000);
    }
    // eslint-disable-next-line
  }, [user.data?.expToken, dispatch]);

  return (
    <>
      <PushNotification />
      <TimerNotifications />
      <div className="flex w-screen">
        <SidebarMenu />

        <div className="bg-slate-200 overflow-auto h-screen w-full relative overflow-x-hidden">
          {/* <Header /> */}
          <Notifications />
          <div className="pb-10 overflow-x-hidden h-screen mt-1 phone:pb-16 phone:overflow-y-auto tablet:h-screen">
            <MainBoard />
          </div>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
