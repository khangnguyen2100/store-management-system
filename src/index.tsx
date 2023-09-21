import { createRoot } from 'react-dom/client';

import App from 'src/App';
import 'src/styles/ant-custom.css';
import 'src/styles/global.css';

const root = createRoot(document.getElementById('root') as HTMLElement);

root.render(<App />);
