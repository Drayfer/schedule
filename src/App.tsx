import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from './components/pages/Dashboard';
import LoginPage from './components/pages/LoginPage';
import FirstPage from './components/pages/FirstPage';
import './App.css';
import { Provider } from 'react-redux';
import store from './store/store';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import Activation from './components/pages/Activation';
import PasswordPage from './components/pages/PasswordPage';

let persistor = persistStore(store);

function App() {
  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
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
        </PersistGate>
      </Provider>
    </>
  );
}

export default App;
