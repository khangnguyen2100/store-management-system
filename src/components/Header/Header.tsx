import {
  LogoutOutlined,
  PlusOutlined,
  UserOutlined
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import {
  Avatar,
  Button,
  Dropdown,
  Image,
  Space,
  Typography,
  message,
} from 'antd';
import clsx from 'clsx';
import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import useShops, { shopApi } from 'src/api/shopApi';
import { ShopProp } from 'src/constants/types/shop';
import AuthContext from 'src/routes/AuthContext';
import ShopContextMenu from './ShopContextMenu';
import ShopFormModal from './ShopFormModal';
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
  },
  { title: 'Sản phẩm', linkTo: '/san-pham' },
  { title: 'Hóa đơn', linkTo: '/hoa-don' },
];
function AdminHeader() {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);
  const userInfo = localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo') as string)
    : '';
  const idCh = localStorage.getItem('idCh') ? localStorage.getItem('idCh') : '';
  const { data: shops, mutate } = useShops({
    idUsers: userInfo.id,
  });

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [openShopModal, setOpenShopModal] = useState<boolean>(false);
  const [shopModalType, setShopModalType] = useState<'add' | 'edit'>('add');
  const [selectedShop, setSelectedShop] = useState<ShopProp>();

  const handleSwitchShop = (id: string) => {
    localStorage.setItem('idCh', id);
    window.location.reload();
  };
  const handleDeleteShop = async (id: string) => {
    try {
      const res = await shopApi.deleteShop(id);
      message.success('Xóa cửa hàng thành công');
      mutate();
    } catch (error: any) {
      console.log('error:', error);
      message.error(error.message);
    }
  };

  const actions: MenuProps['items'] = [
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
      key: 'shops',
      type: 'group',
      label: 'Cửa hàng',
      children: [
        ...shops?.map((shop: ShopProp) => ({
          key: shop.id,
          label: (
            <Space
              size={'small'}
              className='w-full items-center justify-between'
            >
              <Typography
                className={clsx(
                  'text-md mb-2 mt-1 cursor-pointer font-medium',
                  shop.id == idCh && 'font-semibold text-blue-600',
                )}
                onClick={() => handleSwitchShop(shop.id)}
              >
                {shop.tenCh}
              </Typography>
              <div
                className={clsx(
                  'absolute right-2 top-1/2 -translate-y-1/2',
                  shop.id == idCh && 'hidden',
                )}
              >
                <ShopContextMenu
                  onDelete={() => handleDeleteShop(shop.id)}
                  onEdit={() => {
                    setShopModalType('edit');
                    setOpenShopModal(true);
                    setSelectedShop(shop);
                  }}
                />
              </div>
            </Space>
          ),
        })),
        {
          key: 'add',
          label: (
            <Space
              size={'small'}
              className='w-full items-center justify-start gap-x-2'
            >
              <PlusOutlined />
              <Typography
                className='text-md mb-2 mt-1 cursor-pointer font-medium'
                onClick={() => {
                  if (userInfo.loai === '1') {
                    message.info(
                      'Vui lòng nâng cấp tài khoản để thêm cửa hàng',
                    );
                    return;
                  } else if (userInfo.loai === '2' && shops?.length >= 3) {
                    message.info(
                      'Bạn đã đạt giới hạn tối đa 3 cửa hàng, vui lòng nâng cấp tài khoản để thêm cửa hàng',
                    );
                    return;
                  }
                  setShopModalType('add');
                  setOpenShopModal(true);
                }}
              >
                Thêm cửa hàng
              </Typography>
            </Space>
          ),
        },
      ],
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
                className='w-full'
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
            menu={{ items: actions }}
            trigger={['click']}
            open={isOpen}
            onOpenChange={visible => setIsOpen(visible)}
            placement='bottomRight'
            overlayClassName='!min-w-[200px]'
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
      <ShopFormModal
        visible={openShopModal}
        onCancel={() => setOpenShopModal(false)}
        onSuccess={() => {
          mutate();
          setOpenShopModal(false);
        }}
        type={shopModalType}
        selectedShop={selectedShop}
      />
    </div>
  );
}

export default AdminHeader;
