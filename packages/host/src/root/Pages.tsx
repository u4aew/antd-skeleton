import React, { Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Main } from '../pages/Main';
import { Auth } from '../pages/Auth';
import { MainLayout } from '@host/layouts/MainLayout';
import { useDispatch, useSelector } from 'react-redux';
import { getUserInfo } from '@host/store/features/common/slice';
import { AppDispatch } from '@host/store/store';
import { isLoadingUserSelector } from '@host/store/features/common/selectors';
import { Spin } from 'antd';
import { AuthLayout } from '@host/layouts/AuthLayout';

const Cards = React.lazy(() => import('remote-modules-cards/Cards'));
const Transactions = React.lazy(
  () => import('remote-modules-transactions/Transactions'),
);

const Pages = () => {
  const dispatch: AppDispatch = useDispatch();
  const isLoading = useSelector(isLoadingUserSelector);
  useEffect(() => {
    const load = async () => {
      await dispatch(getUserInfo());
    };
    load();
  }, []);
  return (
    <Router>
      {isLoading ? (
        <div
          style={{
            minHeight: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Spin />
        </div>
      ) : (
        <AuthLayout>
          <Routes>
            <Route path={'/'} element={<Auth />}></Route>
          </Routes>
        </AuthLayout>
        // <MainLayout>
        //   <Suspense fallback={<div>Loading...</div>}>
        //     <Routes>
        //       <Route path={'/'} element={<Auth />}></Route>
        //       <Route path={'/cards/*'} element={<Cards />} />
        //       <Route path={'/transactions/*'} element={<Transactions />} />
        //     </Routes>
        //   </Suspense>
        // </MainLayout>
      )}
    </Router>
  );
};
export default Pages;
