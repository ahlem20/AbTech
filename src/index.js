import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Import the Tailwind CSS file
import App from './App';
import { ThemeProvider } from './themeContext';
import{disableReactDevTools} from '@fvilers/disable-react-devtools'

if(process.env.NODE_ENV === 'production') disableReactDevTools()
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
