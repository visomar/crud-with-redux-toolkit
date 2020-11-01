import React from 'react';
import { useSelector } from 'react-redux';
import LoginPage from './components/loginpage/LoginPage';
import MainWindow from './components/mainwindow/MainWindow';
import { selectToken } from './components/login/loginSlice';

function App() {
  const token = useSelector(selectToken);
  return (
    <>
      {!token && <LoginPage />}

      {token && <MainWindow />}
    </>
  );
}

export default App;
