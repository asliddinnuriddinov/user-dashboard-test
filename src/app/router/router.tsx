import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AppLayout } from '../layouts/app-layout';
import { UsersListPage } from '@/pages/users-list';
import { UserDetailsPage } from '@/pages/user-details';
import { NotFoundPage } from '@/pages/not-found';

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      { path: '/', element: <UsersListPage /> },
      { path: '/users/:id', element: <UserDetailsPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
]);

export const AppRouter = () => <RouterProvider router={router} />;
