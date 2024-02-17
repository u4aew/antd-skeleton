import { Button, Form, Input } from 'antd';
import { LockOutlined, MailOutlined, UserOutlined } from '@ant-design/icons';
import React, { useCallback } from 'react';

type PropsFormRegister = {
  onSubmit: (values: Record<string, string>) => void;
};

export const FormRegister = ({ onSubmit }: PropsFormRegister) => {
  const [form] = Form.useForm();
  const handleSubmit = useCallback(async (values: Record<string, string>) => {
    onSubmit(values);
  }, []);

  const validatePasswordMatch = ({ getFieldValue }) => ({
    validator(_, value) {
      if (!value || getFieldValue('password') === value) {
        return Promise.resolve();
      }
      return Promise.reject(new Error('Пароли не совпадают!'));
    },
  });

  return (
    <Form form={form} name="register" onFinish={onSubmit} scrollToFirstError>
      <Form.Item
        name="name"
        rules={[
          {
            required: true,
            message: 'Пожалуйста, введите ваше имя!',
            whitespace: true,
          },
        ]}
      >
        <Input prefix={<UserOutlined />} placeholder="Имя" />
      </Form.Item>

      <Form.Item
        name="email"
        rules={[
          { required: true, message: 'Пожалуйста, введите ваш Email!' },
          { type: 'email', message: 'Email введен некорректно!' },
        ]}
      >
        <Input prefix={<MailOutlined />} placeholder="Email" />
      </Form.Item>

      <Form.Item
        name="password"
        rules={[{ required: true, message: 'Пожалуйста, введите ваш пароль!' }]}
        hasFeedback
      >
        <Input.Password prefix={<LockOutlined />} placeholder="Пароль" />
      </Form.Item>

      <Form.Item
        name="passwordRepeat"
        dependencies={['password']}
        hasFeedback
        rules={[
          { required: true, message: 'Пожалуйста, подтвердите ваш пароль!' },
          validatePasswordMatch,
        ]}
      >
        <Input.Password
          prefix={<LockOutlined />}
          placeholder="Подтверждение пароля"
        />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Зарегистрироваться
        </Button>
      </Form.Item>
    </Form>
  );
};
