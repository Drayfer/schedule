import jwtDecode from 'jwt-decode';
import moment from 'moment';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { reset } from '../../store/reducers/UserSlice';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import MainBoard from '../MainBoard/MainBoard';
import SidebarMenu from '../SidebarMenu/SidebarMenu';

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
      setTimeout(
        () => dispatch(reset()),
        moment(exp).diff(moment().unix()) * 1000
      );
    }
    // eslint-disable-next-line
  }, [user.data?.expToken, dispatch]);

  return (
    <>
      <div className="flex w-screen">
        <SidebarMenu />

        <div className="bg-slate-200 overflow-auto h-screen w-full relative overflow-x-hidden">
          <Header />
          <div className="min-h-screen">
            <MainBoard />
          </div>

          <Footer />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
