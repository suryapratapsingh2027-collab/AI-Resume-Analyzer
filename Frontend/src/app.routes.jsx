import {createBrowserRouter} from 'react-router-dom'
import Login from './auth/pages/Login'
import Register from './auth/pages/Register'
import Protected from './auth/components/Protected'
import Home from './interview/pages/Home'
import ReportDashboard from './interview/pages/ReportDashboard'
import Navbar from './interview/pages/Navbar'


export const router = createBrowserRouter([
    {
        path: '/login',
        element: <Login />
    },
    {
        path: '/register',
        element: <Register />
    },
    {
        path: '/',
        element: <Protected>
            <Navbar />
            <Home />
            </Protected>
    },
    {
        path: '/interview/:interviewId',
        element: <Protected><ReportDashboard /></Protected>
    }
])