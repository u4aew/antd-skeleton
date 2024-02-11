import React from 'react';
import { Layout, Form, Input, Button, Checkbox, Card } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { Content } = Layout;

export const AuthLayout = ({ children }) => {
  const onFinish = (values) => {
    console.log('Received values of form: ', values);
    // Здесь можно обработать данные формы, например, отправить на сервер
  };

  return (
    <Layout className="layout" style={{ minHeight: '100vh' }}>
      <Content
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {children}
      </Content>
    </Layout>
  );
};

export default AuthLayout;
