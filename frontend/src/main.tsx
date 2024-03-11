import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import CRUDView from './pages/CRUDView';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <CRUDView />
    </React.StrictMode>,
);
