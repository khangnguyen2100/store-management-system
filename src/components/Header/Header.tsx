import { LockOutlined, LogoutOutlined, UserOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Avatar, Button, Dropdown, Image, Space, Typography } from 'antd';
import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import AuthContext from 'src/routes/AuthContext';
type NavbarLinkType = {
  title: string;
  linkTo: string;
  subMenu?: MenuProps['items'];
};

const NavbarLinks: NavbarLinkType[] = [
  {
    title: 'Tổng quan',
    linkTo: '/',
  },
  {
    title: 'Bán hàng',
    linkTo: '/ban-hang',
    subMenu: [
      {
        key: '1',
        label: <Link to={'/ban-hang'}>Bán hàng</Link>,
      },
      {
        key: '2',
        label: <Link to={'/lich-su-ban-hang'}>Lịch sử bán hàng</Link>,
      },
      {
        key: '3',
        label: <Link to={'/danh-sach-khach-hang'}>Danh sách khách hàng</Link>,
      },
    ],
  },
  { title: 'Sản phẩm', linkTo: '/san-pham' },
  { title: 'Nhân viên', linkTo: '#!' },
  { title: 'Báo cáo', linkTo: '#!' },
];
function AdminHeader() {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);

  const action: MenuProps['items'] = [
    {
      key: 'detail',
      label: (
        <Space onClick={() => navigate('/thong-tin-tai-khoan')}>
          <UserOutlined />
          <Typography className='header-accountAction'>
            Chi tiết tài khoản
          </Typography>
        </Space>
      ),
    },
    {
      key: 'change-password',
      label: (
        <Space onClick={() => navigate('/thay-doi-mat-khau')}>
          <LockOutlined />
          <Typography className='header-accountAction'>Đổi mật khẩu</Typography>
        </Space>
      ),
    },
    {
      key: 'logout',
      label: (
        <Space onClick={logout} style={{ width: '100%' }}>
          <LogoutOutlined />
          <Typography className='header-accountAction'>Đăng xuất</Typography>
        </Space>
      ),
    },
  ];
  const username = localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo') as string).HoTen
    : '';
  return (
    <div className='sticky inset-x-0 top-0 z-[100] h-[60px] w-full bg-[#0090DA] shadow-md'>
      <div className='mx-auto flex h-full w-full max-w-xl items-center justify-between px-4 xld:px-0'>
        <div className='h-[50px] w-[50px]'>
          <Image
            preview={false}
            src='/logo-icon.png'
            className='h-full w-full object-cover'
            width={50}
            height={50}
          />
        </div>
        <div className='header-nav flex max-w-xl'>
          {NavbarLinks.map((item, index) => {
            return item.subMenu ? (
              <Dropdown
                menu={{ items: item.subMenu }}
                key={index}
                overlayClassName={'header-nav-dropdown'}
              >
                <Link
                  to={item.linkTo}
                  key={index}
                  className='transition-md rounded-md px-3 py-2 font-noto text-white hover:bg-[#0078b6]'
                >
                  {item.title}
                </Link>
              </Dropdown>
            ) : (
              <Link
                to={item.linkTo}
                key={index}
                className='transition-md rounded-md px-3 py-2 font-noto text-white hover:bg-[#0078b6]'
              >
                {item.title}
              </Link>
            );
          })}

          <Dropdown
            menu={{ items: action }}
            trigger={['click']}
            placement='bottomLeft'
          >
            <Space size={'small'} className='cursor-pointer'>
              <Typography className='ml-8 text-base font-semibold text-white'>
                {username}
              </Typography>
              <Button
                shape='circle'
                style={{
                  backgroundColor: 'transparent',
                  padding: '0',
                  border: 'none',
                }}
              >
                <Avatar
                  className='account-avatar'
                  src='https://xsgames.co/randomusers/avatar.php?g=pixel&key=1'
                />
              </Button>
            </Space>
          </Dropdown>
        </div>
      </div>
    </div>
  );
}

export default AdminHeader;
