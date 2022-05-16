import jwtDecode from 'jwt-decode';
import moment from 'moment';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { resetUser } from '../../store/reducers/UserSlice';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import MainBoard from '../MainBoard/MainBoard';
import SidebarMenu from '../SidebarMenu/SidebarMenu';
import PushNotification from '../Schedule/PushNotification';
import { resetStudent } from '../../store/reducers/StudentSlice';
import { resetOpions } from '../../store/reducers/OptionsSlice';
import { resetLesson } from '../../store/reducers/LessonSlice';

const Dashboard = () => {
  const { user } = useAppSelector((state) => state);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

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
        dispatch(resetUser());
        dispatch(resetStudent());
        dispatch(resetOpions());
        dispatch(resetLesson());
      }, moment(exp).diff(moment().unix()) * 1000);
    }
    // eslint-disable-next-line
  }, [user.data?.expToken, dispatch]);

  return (
    <>
      <PushNotification />
      <div className="flex w-screen">
        <SidebarMenu />

        <div className="bg-slate-200 overflow-auto h-screen w-full relative overflow-x-hidden">
          {/* <Header /> */}
          <div className="min-h-screen mt-1">
            <MainBoard />
          </div>

          <Footer />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
