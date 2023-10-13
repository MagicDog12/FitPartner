import React from 'react';
import ReactDOM from 'react-dom/client';
import { Login } from "./routes/Login.jsx";
import { Signup } from './routes/Signup.jsx';
import { ForgotPassword } from "./routes/ForgotPassword.jsx";
import { ResetPassword } from "./routes/ResetPassword.jsx";
import { Home } from './routes/Home.jsx';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ProtectedRoute } from './routes/ProtectedRoute.jsx';
import { AuthProvider } from './auth/AuthProvider.jsx';
import { NotificationProvider } from './context/NotificationContext';
import { Profile } from './routes/Profile.jsx';
import { Search } from './routes/Search.jsx';
import { NewTraining } from './routes/NewTraining.jsx';
import { Statistics } from './routes/Statistics.jsx';
// import './components/Formulario.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />
  },
  {
    path: '/signup',
    element: <Signup />
  },
  {
    path: '/forgot-password',
    element: <ForgotPassword />
  },
  {
    path: '/reset-password/:token',
    element: <ResetPassword />,
  },
  {
    path: '/',
    element: <ProtectedRoute />,
    children: [
      {
        path: '/home',
        element: <Home />,
      },
    ],
  },
  {
    path: '/',
    element: <ProtectedRoute />,
    children: [
      {
        path: '/profile',
        element: <Profile />,
      },
    ],
  },
  {
    path: '/',
    element: <ProtectedRoute />,
    children: [
      {
        path: '/search',
        element: <Search />,
      },
    ],
  },
  {
    path: '/',
    element: <ProtectedRoute />,
    children: [
      {
        path: '/new-training',
        element: <NewTraining />,
      },
    ],
  },
  {
    path: '/',
    element: <ProtectedRoute />,
    children: [
      {
        path: '/statistics',
        element: <Statistics />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <div className='flex w-full h-screen' id='main'>
      <AuthProvider>
        <NotificationProvider>
          <RouterProvider router={router} />
        </NotificationProvider>
      </AuthProvider>
    </div>
  </React.StrictMode>,
)
