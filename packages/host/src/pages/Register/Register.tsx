import React, { useCallback } from 'react';
import { Card } from 'antd';
import { useDispatch } from 'react-redux';
import { FormRegister } from '@host/components/Forms/Register/FormRegister';

export const Register = () => {
  const dispatch = useDispatch();
  const onSubmit = useCallback((values) => {
    console.log(values, 'values');
  }, []);
  return (
    <Card title="Регистрация" style={{ width: 300 }}>
      <FormRegister onSubmit={onSubmit} />
    </Card>
  );
};

export default Register;
