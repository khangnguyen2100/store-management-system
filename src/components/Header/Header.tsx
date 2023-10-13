import { Dropdown, Image } from 'antd';
import { IconType } from 'react-icons';
import {
  MdOutlineAccountBalanceWallet,
  MdOutlineSavings,
  MdOutlineColorLens,
  MdOutlineLiveHelp,
  MdOutlineFeedback,
  MdOutlineMail,
  MdOutlineAccountCircle,
  MdDeliveryDining,
  MdOutlineShoppingBag,
  MdLanguage,
  MdSettings,
} from 'react-icons/md';
import type { MenuProps } from 'antd';
type NavbarLinkType = {
  title: string;
  linkTo: string;
  subMenu?: MenuProps['items'];
};
import { Link } from 'react-router-dom';

const NavbarLinks: NavbarLinkType[] = [
  {
    title: 'Tổng quan',
    linkTo: '#!',
    subMenu: [
      {
        key: '1',
        label: (
          <a
            target='_blank'
            rel='noopener noreferrer'
            href='https://www.antgroup.com'
          >
            1st menu item
          </a>
        ),
      },
      {
        key: '2',
        label: (
          <a
            target='_blank'
            rel='noopener noreferrer'
            href='https://www.aliyun.com'
          >
            2nd menu item
          </a>
        ),
      },
      {
        key: '3',
        label: (
          <a
            target='_blank'
            rel='noopener noreferrer'
            href='https://www.luohanacademy.com'
          >
            3rd menu item
          </a>
        ),
      },
    ],
  },
  {
    title: 'Hàng hóa',
    linkTo: '#!',
    subMenu: [
      {
        key: '1',
        label: (
          <a
            target='_blank'
            rel='noopener noreferrer'
            href='https://www.antgroup.com'
          >
            1st menu item
          </a>
        ),
      },
      {
        key: '2',
        label: (
          <a
            target='_blank'
            rel='noopener noreferrer'
            href='https://www.aliyun.com'
          >
            2nd menu item
          </a>
        ),
      },
      {
        key: '3',
        label: (
          <a
            target='_blank'
            rel='noopener noreferrer'
            href='https://www.luohanacademy.com'
          >
            3rd menu item
          </a>
        ),
      },
    ],
  },
  {
    title: 'Giao dịch',
    linkTo: '#!',
    subMenu: [
      {
        key: '1',
        label: (
          <a
            target='_blank'
            rel='noopener noreferrer'
            href='https://www.antgroup.com'
          >
            1st menu item
          </a>
        ),
      },
      {
        key: '2',
        label: (
          <a
            target='_blank'
            rel='noopener noreferrer'
            href='https://www.aliyun.com'
          >
            2nd menu item
          </a>
        ),
      },
      {
        key: '3',
        label: (
          <a
            target='_blank'
            rel='noopener noreferrer'
            href='https://www.luohanacademy.com'
          >
            3rd menu item
          </a>
        ),
      },
    ],
  },
  { title: 'Đối tác', linkTo: '#!' },
  { title: 'Nhân viên', linkTo: '#!' },
  { title: 'Sổ quỹ', linkTo: '#!' },
  { title: 'Báo cáo', linkTo: '#!' },
];
type TopHeaderLinksType = {
  icon: IconType;
  title?: string;
  linkTo: string;
};
const TopHeaderLinks: TopHeaderLinksType[] = [
  { icon: MdOutlineShoppingBag, title: 'Bán online', linkTo: '#!' },
  { icon: MdDeliveryDining, title: 'Giao hàng', linkTo: '#!' },
  { icon: MdLanguage, title: 'Website', linkTo: '#!' },
  { icon: MdOutlineAccountBalanceWallet, title: 'Tài chính', linkTo: '#!' },
  { icon: MdOutlineSavings, title: 'Nguồn hàng giá tốt', linkTo: '#!' },
  { icon: MdOutlineColorLens, title: 'Chủ đề', linkTo: '#!' },
  { icon: MdOutlineLiveHelp, title: 'Hỗ trợ', linkTo: '#!' },
  { icon: MdOutlineFeedback, title: 'Góp ý', linkTo: '#!' },
  { icon: MdOutlineMail, linkTo: '#!' },
  { icon: MdSettings, linkTo: '#!' },
  { icon: MdOutlineAccountCircle, title: '0335702367', linkTo: '#!' },
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
              <Dropdown menu={{ items: item.subMenu }} key={index} overlayClassName={'header-nav-dropdown'}>
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
