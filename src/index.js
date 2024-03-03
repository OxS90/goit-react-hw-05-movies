import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { StrictMode } from 'react';
import App from './components/App';
import ErrorBoundary from 'components/ErrorBoundary';
import './index.css';

const rootEl = document.getElementById('root');
const root = createRoot(rootEl);

root.render(
  <StrictMode>
    <BrowserRouter>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </BrowserRouter>
  </StrictMode>
);
