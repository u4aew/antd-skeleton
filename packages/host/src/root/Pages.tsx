import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Spin } from 'antd';

import RequireAuth from '../components/auth/RequireAuth';

import { MainLayout } from '@host/layouts/MainLayout';
import { AuthLayout } from '@host/layouts/AuthLayout';
import { Auth } from '../pages/Auth';
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
            path="/"
            element={
              <RequireAuth>
                <MainLayout>
                  <Main />
                </MainLayout>
              </RequireAuth>
            }
          />
          <Route
            path="/cards/*"
            element={
              <RequireAuth>
                <MainLayout>
                  <Cards />
                </MainLayout>
              </RequireAuth>
            }
          />
          <Route
            path="/transactions/*"
            element={
              <RequireAuth>
                <MainLayout>
                  <Transactions />
                </MainLayout>
              </RequireAuth>
            }
          />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default Pages;
