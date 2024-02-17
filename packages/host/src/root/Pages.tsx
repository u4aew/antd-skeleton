import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Spin } from 'antd';

import { RoutesProtected } from '../components/Routes';
import { MainLayout } from '@host/layouts/MainLayout';
import { AuthLayout } from '@host/layouts/AuthLayout';
import { Auth } from '../pages/Auth';
import { Register } from '../pages/Register';
import { Main } from '../pages/Main';
const Cards = React.lazy(() => import('remote-modules-cards/Cards'));
const Transactions = React.lazy(
  () => import('remote-modules-transactions/Transactions'),
);

const Pages = () => {
  return (
    <Router>
      <Suspense fallback={<Spin size="large" />}>
        <Routes>
          <Route
            path="/login"
            element={
              <AuthLayout>
                <Auth />
              </AuthLayout>
            }
          />
          <Route
            path="/register"
            element={
              <AuthLayout>
                <Register />
              </AuthLayout>
            }
          />
          <Route
            path="/"
            element={
              <RoutesProtected>
                <MainLayout>
                  <Main />
                </MainLayout>
              </RoutesProtected>
            }
          />
          <Route
            path="/cards/*"
            element={
              <RoutesProtected>
                <MainLayout>
                  <Cards />
                </MainLayout>
              </RoutesProtected>
            }
          />
          <Route
            path="/transactions/*"
            element={
              <RoutesProtected>
                <MainLayout>
                  <Transactions />
                </MainLayout>
              </RoutesProtected>
            }
          />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default Pages;
