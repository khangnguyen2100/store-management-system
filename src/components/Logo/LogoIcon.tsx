import { Image } from 'antd';
import { Link } from 'react-router-dom';

const LogoIcon = () => {
  return (
    <Link to={'/'}>
      <Image
        src={require('src/assets/images/logo-icon.png')}
        alt='bee-smart-logo'
        height={50}
        width={50}
        preview={false}
      />
    </Link>
  );
};

export default LogoIcon;
