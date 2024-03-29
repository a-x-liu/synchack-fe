import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
//
import Login from './pages/Login';
import Register from './pages/Register';
import DashboardApp from './pages/DashboardApp';
import Products from './pages/Products';
import Blog from './pages/Blog';
import User from './pages/User';
import NotFound from './pages/Page404';
import CreatePost from './pages/CreatePost';
import FullPost from './pages/FullPost';
import Events from './pages/Events';
import ThankYou from './pages/ThankYou';
import CreateEvent from './pages/CreateEvent';
import FullEvent from './pages/FullEvent';

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { path: '/', element: <Navigate to="/dashboard/profile/:userId" replace /> },
        { path: 'profile/:userId', element: <DashboardApp /> },
        { path: 'user', element: <User /> },
        { path: 'explore', element: <Products /> },
        { path: 'blog', element: <Blog /> },
        { path: 'createpost', element: <CreatePost /> },
        { path: 'viewevent/:eventid', element: <FullEvent />},
        { path: 'viewpost/:postid', element: <FullPost />},
        { path: 'events', element: <Events />},
        { path: 'createevent', element: <CreateEvent />},
        { path: 'thankyou', element: <ThankYou />}
      ]
    },
    {
      path: '/',
      element: <LogoOnlyLayout />,
      children: [
        { path: 'login', element: <Login /> },
        { path: 'register', element: <Register /> },
        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/404" /> },
        { path: '/', element: <Navigate to="/login" /> }
      ]
    },
    { path: '*', element: <Navigate to="/404" replace /> }
  ]);
}
