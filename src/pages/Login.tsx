import { LockOutlined, UserOutlined } from '@ant-design/icons';
import {
  Button,
  Form,
  Image,
  Input,
  Layout,
  Popconfirm,
  Typography,
  message,
} from 'antd';
import { useEffect, useRef, useState } from 'react';
import { useAuthState, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';

import authApi from 'src/api/authApi';
import Logo from 'src/components/Logo/Logo';
import { fireBaseAuth } from 'src/configs/firebase';
import { HOME } from 'src/routes/routes.auth';
const { Footer, Content } = Layout;

type ForgotPasswordProps = {
  onSuccess: () => void;
  email: string;
};
const ForgotPassword = ({ onSuccess, email }: ForgotPasswordProps) => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const handleSendMail = async () => {
    setConfirmLoading(true);

    try {
      const res = await authApi.forgotPassword(email as string);
      if (res.data.status) {
        message.success(
          'Mật khẩu mới tạm thời đã được gửi về email của bạn. Vui Lòng kiểm tra email',
        );
        onSuccess();
      } else {
        message.error('Có lỗi xảy ra!');
      }
    } catch (error) {
      console.error(error);
    } finally {
      setOpen(false);
      setConfirmLoading(false);
    }
  };
  return (
    <Popconfirm
      title='Lấy lại mật khẩu?'
      description='Mật khâu mới sẽ được gửi đến email của bạn!'
      open={open}
      onConfirm={handleSendMail}
      okButtonProps={{ loading: confirmLoading }}
      onCancel={() => setOpen(false)}
      okText='Xác nhận'
      cancelText='Huỷ'
    >
      <a
        onClick={() => {
          if (!email) {
            message.error('Vui lòng nhập email!');
            return;
          }
          // validate email
          const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!regex.test(email)) {
            message.error('Email không hợp lệ!');
            return;
          }
          setOpen(true);
        }}
      >
        Quên mật khẩu?
      </a>
    </Popconfirm>
  );
};

export default function AntSignInSideTemplate() {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const inputRef = useRef(null);
  const [signInWithGoogle] = useSignInWithGoogle(fireBaseAuth);
  const [user] = useAuthState(fireBaseAuth);
  const [isLoading, setIsLoading] = useState(false);
  const [emailValue, setEmailValue] = useState<string>('');
  console.log('emailValue:', emailValue);
  const handleLoginWithGoogle = async () => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const UserImpl: any = user;
      const res = await authApi.loginWithGoogle({
        email: UserImpl.email,
        token: UserImpl.accessToken,
      });
      if (res.status === 200) {
        localStorage.setItem('beesmart_token', res.data.token);
        localStorage.setItem(
          'userInfo',
          JSON.stringify({
            id: res.data.tt_user.id,
            email: res.data.tt_user.email,
            HoTen: res.data.tt_user.HoTen,
            sdt: res.data.tt_user.sdt,
            Diachi: res.data.tt_user.Diachi,
            vaiTro: res.data.tt_user.vaiTro,
            idCh: res.data.tt_user.idCh,
            tenCh: res.data.tt_user.tenCh,
            tenLoaiCh: res.data.tt_user.tenLoaiCh,
            idLoaiCh: res.data.tt_user.idLoaiCh,
            loai: res.data.tt_user.loai,
          }),
        );
        localStorage.setItem('idCh', res.data.tt_user.idCh);
        message.success('Đăng nhập thành công');
        navigate(HOME);
        return true;
      } else {
        message.error(res.data.message || 'Tài khoản chưa được đăng ký.');
        return false;
      }
    } catch (error) {
      console.log('login with google error:', error);
      message.error('Tài khoản chưa được đăng ký.');
      return false;
    }
  };

  const handleSubmitForm = async () => {
    try {
      setIsLoading(true);
      await form.validateFields();
      const values = form.getFieldsValue();
      const res = await authApi.login(values);
      if (res?.data) {
        localStorage.setItem('beesmart_token', res.data.token);
        localStorage.setItem(
          'userInfo',
          JSON.stringify({
            id: res.data.tt_user[0].id,
            email: res.data.tt_user[0].email,
            HoTen: res.data.tt_user[0].HoTen,
            sdt: res.data.tt_user[0].sdt,
            Diachi: res.data.tt_user[0].Diachi,
            vaiTro: res.data.tt_user[0].vaiTro,
            idCh: res.data.tt_user[0].idCh,
            tenCh: res.data.tt_user[0].tenCh,
            tenLoaiCh: res.data.tt_user[0].tenLoaiCh,
            idLoaiCh: res.data.tt_user[0].idLoaiCh,
            loai: res.data.tt_user[0].loai,
          }),
        );
        localStorage.setItem('idCh', res.data.tt_user[0].idCh);
        setIsLoading(prev => !prev);
        message.success('Đăng nhập thành công');
        navigate(HOME);
      }
    } catch (error) {
      console.log('error:', error);
      message.error(
        'Đăng nhập không thành công. Vui lòng kiểm tra lại thông tin.',
      );
      if (inputRef.current) {
        // Focus vào input sử dụng ref
        (inputRef.current as HTMLInputElement).focus();
      }
      setIsLoading(prev => !prev);
    }
  };

  useEffect(() => {
    const checkGoogleAccount = async () => {
      if (user) {
        await handleLoginWithGoogle();
      }
    };
    checkGoogleAccount();
    window.addEventListener('keydown', async e => {
      if (e.key === 'Enter') {
        setIsLoading(true);
        await handleSubmitForm();
      }
    });
    return window.removeEventListener('keydown', async e => {
      if (e.key === 'Enter') {
        setIsLoading(true);
        await handleSubmitForm();
        if (inputRef.current) {
          // Focus vào input sử dụng ref
          (inputRef.current as HTMLInputElement).focus();
        }
      }
    });
  }, [user]);

  return (
    <Layout className='flex min-h-screen flex-col'>
      <div className='mx-auto flex w-full max-w-large py-3'>
        <Logo />
        <div></div>
      </div>
      <Content className='m-auto mt-10 flex w-[400px] flex-col gap-2 rounded-sm pb-5'>
        <div className='block text-center'>
          <Typography.Title level={1}>Đăng nhập</Typography.Title>
        </div>
        <Form
          name='normal_login'
          className='login-form'
          initialValues={{ remember: true }}
          form={form}
        >
          <Form.Item
            name='email'
            rules={[{ required: true, message: 'Vui lòng nhập email!' }]}
          >
            <Input
              prefix={<UserOutlined className='site-form-item-icon' />}
              placeholder='Email'
              size='large'
              ref={inputRef}
              onChange={e => setEmailValue(e.target.value)}
              value={emailValue}
            />
          </Form.Item>
          <Form.Item
            name='password'
            rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
          >
            <Input.Password
              prefix={<LockOutlined className='site-form-item-icon' />}
              type='password'
              placeholder='Mật khẩu'
              size='large'
            />
          </Form.Item>
          <div className='mb-3 flex justify-between'>
            <ForgotPassword
              onSuccess={() => {
                form.setFieldsValue({ email: '' });
              }}
              email={emailValue}
            />
            <Typography.Text
              className='cursor-pointer text-sm text-primary !underline'
              onClick={() =>
                (window.location.href = 'https://beesmart.io.vn/sign-up')
              }
            >
              Đăng ký tài khoản
            </Typography.Text>
          </div>
        </Form>
        <Button
          type='primary'
          htmlType='submit'
          className='login-form-button mb-1 w-full'
          size='large'
          onClick={handleSubmitForm}
          loading={isLoading}
        >
          Đăng nhập
        </Button>
        <Button
          className='flex-center w-full gap-x-3'
          size='large'
          onClick={() => signInWithGoogle()}
        >
          <Image
            src={require('src/assets/images/google-icon.png')}
            width={32}
            height={32}
            preview={false}
          />
          Đăng nhập với Google
        </Button>
      </Content>
      <Footer className='py-3'>
        <Typography className='text-center'>
          © BeeSmart {new Date().getFullYear()}
        </Typography>
      </Footer>
    </Layout>
  );
}
