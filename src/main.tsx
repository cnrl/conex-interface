import React from 'react';
import ReactDOM from 'react-dom/client';
import { ReactFlowProvider } from 'reactflow';
import { App } from './app.tsx';
import { ReactQueryProvider } from './providers/react-query.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ReactQueryProvider>
      <ReactFlowProvider>
        <App />
      </ReactFlowProvider>
    </ReactQueryProvider>
  </React.StrictMode>,
);
