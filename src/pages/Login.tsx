import React from 'react';
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

const LoginForm: React.FC = () => {
  const onFinish = (values: any) => {
    console.log('Received values of form:', values);
  };

  return (
    <div
      className='flex h-screen items-center justify-center'
      style={{ backgroundImage: `url('background.jpg')` }}
    >
      <Form
        name='login-form'
        className='login-form'
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Form.Item>
          <h1 className='mb-8 text-4xl font-bold'>Welcome to MyApp</h1>
        </Form.Item>
        <Form.Item
          name='email'
          rules={[{ required: true, message: 'Please enter your email' }]}
        >
          <Input
            prefix={<UserOutlined className='site-form-item-icon' />}
            placeholder='Email'
          />
        </Form.Item>
        <Form.Item
          name='password'
          rules={[{ required: true, message: 'Please enter your password' }]}
        >
          <Input.Password
            prefix={<LockOutlined className='site-form-item-icon' />}
            placeholder='Password'
          />
        </Form.Item>
        <Form.Item>
          <Button
            type='primary'
            htmlType='submit'
            className='login-form-button'
          >
            Log in
          </Button>
        </Form.Item>
        <Form.Item>
          <Button
            className='login-form-button'
            icon={<img alt='Google' src='google-logo.png' />}
            onClick={() => console.log('Sign in with Google')}
          >
            Sign in with Google
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginForm;
