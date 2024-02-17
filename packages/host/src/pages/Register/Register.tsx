import React, { useCallback, useState } from 'react';
import { Card } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { RegisterForm } from './components/Form/';
import { RegisterInfoSuccess, RegisterInfoError } from './components/Info';
import { register } from '@host/store/features/register/slice';
import { isLoadingRegisterSelector } from '@host/store/features/register/selectors';

const enum Steps {
  form,
  success,
  error,
}

export const Register = () => {
  const isLoadingRegister = useSelector(isLoadingRegisterSelector);
  const [email, setEmail] = useState<string>('');
  const [step, setStep] = useState<Steps>(Steps.form);
  const dispatch = useDispatch();
  const onSubmit = useCallback(async (values) => {
    const locale = 'RU';
    const { email, name, password } = values;
    try {
      // @ts-ignore
      await dispatch(register({ email, name, password, locale }));
      setEmail(email);
      setStep(Steps.success);
    } catch (e) {
      setEmail('');
      setStep(Steps.error);
    }
  }, []);

  if (step === Steps.form) {
    return (
      <Card title="Регистрация" style={{ width: 300 }}>
        <RegisterForm loading={isLoadingRegister} onSubmit={onSubmit} />
      </Card>
    );
  }

  if (step === Steps.success) {
    return (
      <Card title="Успех" style={{ width: 300 }}>
        <RegisterInfoSuccess email={email} onButtonClick={console.log} />
      </Card>
    );
  }

  if (step === Steps.error) {
    return (
      <Card title="Ошибка" style={{ width: 300 }}>
        <RegisterInfoError onButtonClick={console.log} />
      </Card>
    );
  }
};

export default Register;
