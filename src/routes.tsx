import { createBrowserRouter } from 'react-router-dom';
import Homepage from './pages/Homepage/Homepage';
import CartPage from './pages/Cart/CartPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Homepage />,
  },
  {
    path: '/cart',
    element: <CartPage />,
  },
]);

export default router;
