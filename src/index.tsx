import React from 'react';
import { createRoot } from 'react-dom/client';

import App from 'src/App';
import './global.css';

const root = createRoot(document.getElementById('root') as HTMLElement);

root.render(<App />);
