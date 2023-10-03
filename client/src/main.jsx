import React from 'react';
import ReactDOM from 'react-dom/client';
import { Login } from "./routes/Login.jsx";
import { Signup } from './routes/Signup.jsx';
import { ForgotPassword } from "./routes/ForgotPassword.jsx";
import { Home } from './routes/Home.jsx';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ProtectedRoute } from './routes/ProtectedRoute.jsx';
import { AuthProvider } from './auth/AuthProvider.jsx';
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
    path: '/',
    element: <ProtectedRoute />,
    children: [
      {
        path: '/home',
        element: <Home />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <div className='flex w-full h-screen' id='main'>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </div>
  </React.StrictMode>,
)
