import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { authTokenSelector } from '@host/store/features/auth/selectors';

const RequireAuth = ({ children }) => {
  const authToken = useSelector(authTokenSelector);
  const location = useLocation();

  if (!authToken) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default RequireAuth;
