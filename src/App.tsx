import React from 'react';
import AppNavbar from './components/AppNavbar';
import LandingPage from './pages/LandingPage';
import { Route, Routes } from 'react-router-dom';
import Login from './pages/login/LoginPage';
import PondsData from './pages/ponds/PondsData';
import PageWithNavbarFooter from './components/PageWithNavbarFooter';
import ScrollToTop from './components/ScrollToTop';
import { GlobalProvider } from './contexts/GlobalContext';
import { ModalManager, ThemeProvider } from '@mui/material';
import theme from './theme';
import FarmPage from './pages/FarmPage';
import AdminPage from './pages/admin/AdminPage';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css'
import PondDetailsPage from './pages/ponds/PondDetailsPage';
import RegisterPage from './pages/register/RegisterPage';
import { ToastContainer } from 'react-toastify';
import ResetPasswordPage from './pages/login/ResetPasswordPage';
import ModalManage from './components/Modalmanager';

const App: React.FC = () => {
  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover toastClassName="custom-toast" />
      <ThemeProvider theme={theme}>
      <AuthProvider>
        <ScrollToTop />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/reset" element={<ResetPasswordPage />} />
          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route
              path="/admin"
              element={<PageWithNavbarFooter component={AdminPage} />}
            />
          </Route>

          {/* Public Route */}
          <Route
              path="/farmpage"
              element={<PageWithNavbarFooter component={FarmPage} />}
            />
           <Route
              path="/farmpage/:id"
              element={<PageWithNavbarFooter component={PondDetailsPage} />}
            />
          <Route
            path="/landing"
            element={
              <GlobalProvider>
                <PageWithNavbarFooter component={LandingPage} />
              </GlobalProvider>
            }
          />
          <Route
              path="/ponddata"
              element={
                <GlobalProvider>
                  <PageWithNavbarFooter component={PondsData} />
                </GlobalProvider>
              }
            />
        </Routes>
        <ModalManage />
      </AuthProvider>
      </ThemeProvider>
    </>
  );
};

export default App;
