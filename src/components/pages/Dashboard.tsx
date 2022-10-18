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
import {
  getBilling,
  setLang,
  setLocale
} from '../../store/reducers/OptionsSlice';
import Reminder from '../MainBoard/Reminder';
import NoDemoAccess from '../Settings/NoDemoAccess';
import EducaionBg from '../../assets/images/educationBg.png';
import { lang as language, localeArray } from '../../assets/constants/lang';

const Dashboard = () => {
  const { user, billing, locale, lang, guide } = useAppSelector((state) => ({
    user: state.user,
    billing: state.options.billing,
    locale: state.options?.data?.locale || 'en',
    lang: state.options.lang,
    guide: state.user.data?.guide
  }));
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
    let interval: NodeJS.Timer;
    if (user.data?.token) {
      const { exp } = jwtDecode<any>(user.data.token);
      interval = setInterval(() => {
        if (moment(exp).isBefore(moment().unix())) {
          logout();
        }
      }, 1000);
    }
    return () => clearInterval(interval);
    // eslint-disable-next-line
  }, [user.data?.token, dispatch]);

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

  useEffect(() => {
    let interval = setInterval(() => {
      if (user.data?.id) {
        dispatch(getBilling(user.data.id));
      }
    }, 1000 * 60 * 60 * 3);
    return () => clearInterval(interval);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (locale) {
      dispatch(setLang(language[locale]));
    }
    // eslint-disable-next-line
  }, [locale]);

  if (JSON.stringify(lang) !== JSON.stringify(language[locale])) {
    return null;
  }

  return (
    <>
      <PushNotification />
      <TimerNotifications />
      <div className="flex w-screen">
        <SidebarMenu />

        <div className="bg-slate-200 overflow-auto h-screen w-full relative overflow-x-hidden">
          <Header />

          <div
            className="table:pb-5 pt-[50px] overflow-x-hidden h-screen phone:pb-16 phone:overflow-y-auto tablet:h-screen"
            style={
              !billing?.demo && billing?.paidDays === 0
                ? {
                    backgroundImage: `url(${EducaionBg})`
                  }
                : {}
            }
          >
            {!billing?.demo && billing?.paidDays === 0 ? (
              <NoDemoAccess />
            ) : (
              <MainBoard />
            )}
            <Reminder />
          </div>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
