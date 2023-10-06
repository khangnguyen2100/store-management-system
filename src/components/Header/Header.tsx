import { Dropdown } from 'antd';
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
    <>
      <div className='container flex items-center justify-between px-4 py-5 xld:px-0'>
        <div>
          <img src='/logo.png' className='h-8 w-auto' />
        </div>
        <div></div>
        <div className='flex gap-x-3'>
          {TopHeaderLinks.map((item, index) => {
            return (
              <div key={index} className='flex items-center gap-x-1'>
                <item.icon size={18}></item.icon>
                <Link to={item.linkTo} className='text-xs'>
                  {item.title}
                </Link>
              </div>
            );
          })}
        </div>
      </div>
      <div className='w-full bg-[#0090DA] xld:px-0'>
        <div className='mx-auto flex max-w-xl'>
          {NavbarLinks.map((item, index) => {
            return item.subMenu ? (
              <Dropdown menu={{ items: item.subMenu }} key={index}>
                <Link
                  to={item.linkTo}
                  key={index}
                  className='px-5 py-3 text-white hover:bg-[#0078b6]'
                >
                  {item.title}
                </Link>
              </Dropdown>
            ) : (
              <Link
                to={item.linkTo}
                key={index}
                className='px-5 py-3 text-white hover:bg-[#0078b6]'
              >
                {item.title}
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default AdminHeader;
