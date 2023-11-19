import { LockOutlined, UserOutlined } from '@ant-design/icons';
import {
  Button,
  Checkbox,
  Form,
  Image,
  Input,
  Layout,
  Typography,
  message,
} from 'antd';
import { useEffect } from 'react';
import { useAuthState, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { Link, useNavigate } from 'react-router-dom';

import authApi from 'src/api/authApi';
import Logo from 'src/components/Logo/Logo';
import { fireBaseAuth } from 'src/configs/firebase';
import { HOME } from 'src/routes/routes.auth';
const { Footer, Content } = Layout;

export default function AntSignInSideTemplate() {
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const [signInWithGoogle] = useSignInWithGoogle(fireBaseAuth);
  const [user] = useAuthState(fireBaseAuth);

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
          }),
        );
        localStorage.setItem('idCh', res.data.tt_user[0].idCh);

        message.success('Đăng nhập thành công');
        navigate(HOME);
      }
    } catch (error) {
      console.log('error:', error);
      message.error(
        'Đăng nhập không thành công. Vui lòng kiểm tra lại thông tin.',
      );
    }
  };

  useEffect(() => {
    const checkGoogleAccount = async () => {
      if (user) {
        await handleLoginWithGoogle();
      }
    };
    checkGoogleAccount();
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
            <Link to='/forgot-password'>
              <Typography.Text className='text-sm'>
                Quên mật khẩu?
              </Typography.Text>
            </Link>
            <Typography.Text
              className='text-sm text-primary !underline cursor-pointer'
              onClick={() =>
                (window.location.href =
                  'https://beesmart-stage.vercel.app/sign-up')
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
