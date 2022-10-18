import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from './components/pages/Dashboard';
import LoginPage from './components/pages/LoginPage';
import FirstPage from './components/pages/FirstPage';
import './App.css';
import Activation from './components/pages/Activation';
import PasswordPage from './components/pages/PasswordPage';
import { Notifications } from 'react-push-notification';
import 'moment/locale/ru';
import moment from 'moment';
import ru from 'antd/lib/locale/ru_RU';
import en from 'antd/lib/locale/en_US';
import ua from 'antd/lib/locale/uk_UA';
import { ConfigProvider } from 'antd';
import { useAppSelector } from './hooks/redux';
import PrivacyPage from './components/pages/PrivacyPage';
import RefundPage from './components/pages/RefundPage';
import ResponsibilityPage from './components/pages/ResponsibilityPage';
import GuidePage from './components/pages/GuidePage';

function App() {
  const { locale } = useAppSelector((state) => ({
    locale: state.options?.data?.locale || 'en'
  }));

  moment.locale(locale);

  return (
    <>
      <ConfigProvider
        locale={
          locale === 'en'
            ? en
            : locale === 'ru'
            ? ru
            : locale === 'ua'
            ? ua
            : en
        }
      >
        <Notifications />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<FirstPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<LoginPage />} />
            <Route path="/reset" element={<LoginPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/activate/:id" element={<Activation />} />
            <Route path="/password/:id" element={<PasswordPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/refund" element={<RefundPage />} />
            <Route path="/responsibility" element={<ResponsibilityPage />} />
            <Route path="/guide" element={<GuidePage />} />
            <Route path="*" element={`Not Found`} />
          </Routes>
        </BrowserRouter>
      </ConfigProvider>
    </>
  );
}

export default App;
