import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import KopeckyChurch from './KopeckyChurch.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <KopeckyChurch />
  </StrictMode>
);
