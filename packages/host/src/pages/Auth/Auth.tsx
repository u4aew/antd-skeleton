import { Button, Card, Checkbox, Form, Input } from 'antd';
import { LockOutlined, MailOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { auth } from '@host/store/features/auth/slice';
import { isLoadingAuthSelector } from '@host/store/features/auth/selectors';

export const Auth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoadingAuth = useSelector(isLoadingAuthSelector);
  const onFinish = async (values) => {
    try {
      // @ts-ignore
      const result = await dispatch(auth(values));
      navigate('/');
    } catch (e) {}
  };

  return (
    <Card title="Вход в систему" style={{ width: 300 }}>
      <Form
        name="login_form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Form.Item
          name="email"
          rules={[
            { required: true, message: 'Пожалуйста, введите ваш email!' },
            { type: 'email', message: 'Введите корректный email!' },
          ]}
        >
          <Input prefix={<MailOutlined />} placeholder="Email" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            { required: true, message: 'Пожалуйста, введите ваш пароль!' },
          ]}
        >
          <Input
            prefix={<LockOutlined />}
            type="password"
            placeholder="Пароль"
          />
        </Form.Item>
        <Form.Item>
          <Link to="/forgot-password" style={{ float: 'right' }}>
            Забыли пароль?
          </Link>
        </Form.Item>
        <Form.Item>
          <Button
            loading={isLoadingAuth}
            type="primary"
            htmlType="submit"
            style={{ width: '100%' }}
          >
            Войти
          </Button>
          Или <Link to="/register">зарегистрироваться!</Link>
        </Form.Item>
      </Form>
    </Card>
  );
};
