import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { CartProvider } from './contexts/CartContext';
import './main.css';
import router from './routes';

const rootElement = document.getElementById('root') as HTMLElement;

createRoot(rootElement).render(
  <StrictMode>
    <CartProvider>
      <RouterProvider router={router} />
    </CartProvider>
  </StrictMode>
);
