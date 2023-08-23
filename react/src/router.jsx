import { Navigate, createBrowserRouter } from 'react-router-dom';
import Login from "./views/Login.jsx";
import Signup from "./views/Signup.jsx";

import NotFound from './views/NotFound';

// layouts
import DefaultLayout from './components/DefaultLayout.jsx';
import AdminLayout from './components/AdminLayout.jsx';
import GuestLayout from './components/GuestLayout.jsx';

// app components
import Dashboard from './views/Dashboard.jsx';
import VerifyEmail from './views/VerifyEmail.jsx';

// admin components
import AdminDashboard from './views/admin/Dashboard.jsx';
import Users from "./views/admin/Users.jsx";
import UserCreate from './views/admin/UserCreate.jsx';


const router = createBrowserRouter ([
    {
        path: '/',
        element: <DefaultLayout/>,
        children: [
            {
                path: '/',
                element: <Navigate to="/dashboard" />
            },
            {
                path: '/dashboard',
                element: <Dashboard />
            }
        ]
    },
    {
        path: '/admin',
        element: <AdminLayout />,
        children: [
            {
                path: '/admin/dashboard',
                element: <AdminDashboard />
            },
            {
                path: '/admin/users',
                element: <Users />
            },
            {
                path: '/admin/users/create',
                element: <UserCreate key="userCreate" />
            },
            {
                path: '/admin/users/:id',
                element: <UserCreate key="userUpdate" />
            }
        ]
    },
    {
        path: '/',
        element: <GuestLayout />,
        children: [
            {
                path: '/login',
                element: <Login />
            },
            {
                path: '/signup',
                element: <Signup />
            },
            {
                path: '/email/verification',
                element: <VerifyEmail />
            }
        ]
    },
    {
        path: '*',
        element: <NotFound />
    },
])

export default router;