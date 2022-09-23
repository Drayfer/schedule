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
import TimerNotifications from '../Notifications/TimerNotifications';
import Header from '../Header/Header';

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

  useEffect(() => {
    if (
      window.ReactNativeWebView &&
      user.data?.id &&
      user.data?.token &&
      window.navigator.userAgent.toLowerCase().includes('wv')
    ) {
      const webViewNotification = {
        userId: user.data.id,
        token: user.data.token
      };
      window.ReactNativeWebView.postMessage(
        JSON.stringify(webViewNotification)
      );
    }
  }, [user.data]);

  return (
    <>
      <PushNotification />
      <TimerNotifications />
      <div className="flex w-screen">
        <SidebarMenu />

        <div className="bg-slate-200 overflow-auto h-screen w-full relative overflow-x-hidden">
          <Header />

          <div className="pb-5 pt-[50px] overflow-x-hidden h-screen phone:pb-16 phone:overflow-y-auto tablet:h-screen">
            <MainBoard />
          </div>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
