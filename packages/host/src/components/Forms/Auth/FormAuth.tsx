import { Button, Form, Input } from 'antd';
import { LockOutlined, MailOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import React from 'react';

type PropsFormAuth = {
  onSubmit: (values: Record<string, any>) => void;
  isLoading: boolean;
};

export const FormAuth = ({ onSubmit, isLoading }: PropsFormAuth) => {
  const handleSubmit = (values) => {
    onSubmit(values);
  };

  return (
    <Form name="login_form" onFinish={handleSubmit}>
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
        rules={[{ required: true, message: 'Пожалуйста, введите ваш пароль!' }]}
      >
        <Input prefix={<LockOutlined />} type="password" placeholder="Пароль" />
      </Form.Item>
      <Form.Item>
        <Link to="/forgot-password" style={{ float: 'right' }}>
          Забыли пароль?
        </Link>
      </Form.Item>
      <Form.Item>
        <Button
          loading={isLoading}
          type="primary"
          htmlType="submit"
          style={{ width: '100%' }}
        >
          Войти
        </Button>
        Или <Link to="/register">зарегистрироваться!</Link>
      </Form.Item>
    </Form>
  );
};
