import { Navigate, createBrowserRouter } from 'react-router-dom';
import Login from "./views/Login.jsx";
import Signup from "./views/Signup.jsx";
import Users from "./views/Users.jsx";
import NotFound from './views/NotFound';
import DefaultLayout from './components/DefaultLayout.jsx';
import GuestLayout from './components/GuestLayout.jsx';
import Dashboard from './views/Dashboard.jsx';
import UserCreate from './views/UserCreate.jsx';
import VerifyEmail from './views/VerifyEmail.jsx';


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
            },
            {
                path: '/users',
                element: <Users />
            },
            {
                path: '/users/create',
                element: <UserCreate key="userCreate" />
            },
            {
                path: '/users/:id',
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
                path: '/verify',
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