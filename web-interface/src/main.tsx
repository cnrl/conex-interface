import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App.tsx';
import { ReactQueryProvider } from './providers/react-query.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ReactQueryProvider>
      <App />
    </ReactQueryProvider>
  </React.StrictMode>,
);