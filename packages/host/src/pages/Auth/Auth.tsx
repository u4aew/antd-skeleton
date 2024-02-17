import React from 'react';
import { Card } from 'antd';
import { auth } from '@host/store/features/auth/slice';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { isLoadingAuthSelector } from '@host/store/features/auth/selectors';
import { FormAuth } from '@host/components/Forms/Auth';

export const Auth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoadingAuth = useSelector(isLoadingAuthSelector);
  const onSubmit = async (values) => {
    try {
      // @ts-ignore
      const result = await dispatch(auth(values));
      navigate('/');
    } catch (e) {}
  };

  return (
    <Card title="Вход в систему" style={{ width: 300 }}>
      <FormAuth onSubmit={onSubmit} isLoading={isLoadingAuth} />
    </Card>
  );
};
