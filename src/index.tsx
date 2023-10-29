import { createRoot } from 'react-dom/client';

import App from 'src/App';
import 'src/styles/ant-custom.scss';
import 'src/styles/global.css';
import 'src/assets/Icons/css/all.css';
const root = createRoot(document.getElementById('root') as HTMLElement);

root.render(<App />);
