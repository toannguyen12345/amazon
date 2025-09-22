// Định nghĩa router
import { createBrowserRouter } from 'react-router-dom';
import { createElement } from 'react';

const router = createBrowserRouter([
  {
    path: '/',
    element: createElement('div', null, 'Home Page'),
  },
  {
    path: '/about',
    element: createElement('div', null, 'About Page'),
  },
]);

export default router;
