import type { MenuProps } from 'antd';
import { Dropdown, Image } from 'antd';
import { Link } from 'react-router-dom';
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
  { title: 'Sổ quỹ', linkTo: '#!' },
  { title: 'Báo cáo', linkTo: '#!' },
];
function AdminHeader() {
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
        </div>
      </div>
    </div>
  );
}

export default AdminHeader;
