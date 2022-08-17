import React from 'react';
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

function App() {
  const { locale } = useAppSelector((state) => ({
    locale: state.options.data.locale
  }));

  moment.locale(locale);

  setTimeout(() => {
    if (window.ReactNativeWebView) {
      window.ReactNativeWebView.postMessage('hello');
    }
  }, 2000);

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
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/activate/:id" element={<Activation />} />
            <Route path="/password/:id" element={<PasswordPage />} />
            <Route path="*" element={'Not Found'} />
          </Routes>
        </BrowserRouter>
      </ConfigProvider>
    </>
  );
}

export default App;
