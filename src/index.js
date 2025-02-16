import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import Sideb from './components/Sidebar';

const root = ReactDOM.createRoot(document.getElementById('root'));

const AppWrapper = () => {
  const location = useLocation();
  const pathWithoutQuery = location.pathname.split('?')[0]; // Get path without query params

  const noSidebarRoutes = ['/', '/signup', '/reset-password', '/update', '/forgot']; // Update routes list

  // Check if the current path should show the sidebar
  const showSidebar = !noSidebarRoutes.includes(pathWithoutQuery);

  return (
    <React.StrictMode>
      <div style={{ display: 'flex' }}>
        {/* Conditionally render Sidebar */}
        {showSidebar && <Sideb />}

        {/* Main Content */}
        <div style={{ paddingLeft: showSidebar ? '96px' : '0', paddingTop: '60px', width: '100%' }}>
          <App />
        </div>
      </div>
    </React.StrictMode>
  );
};

root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/*" element={<AppWrapper />} />
    </Routes>
  </BrowserRouter>
);

reportWebVitals();
