import { Image } from 'antd';
import { Link } from 'react-router-dom';

const Logo = () => {
  return (
    <Link to={'/'}>
      <Image
        src={require('src/assets/images/logo.png')}
        alt='bee-smart-logo'
        height={55}
        width={186}
        preview={false}
      />
    </Link>
  );
};

export default Logo;
