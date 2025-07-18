import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import './index.css'
import { Toaster } from 'react-hot-toast';
import App from './App.jsx'
import LandingPage from './pages/LandingPage.jsx'
import ListsPage from './pages/ListsPage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import SignupPage from './pages/SignupPage.jsx'
import EditPage from './pages/EditPage.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <LandingPage />,
      },
      {
        path: "/lists",
        loader: () => {
          const isAuth = localStorage.getItem("auth") === "true";
          if (!isAuth) {
            throw new Response("Unauthorized", { status: 302, headers: { Location: "/" } });
          }
          return null;
        },
        element: <ListsPage />,
      },
      {
        path: "/edit/:id",
        loader: () => {
          const isAuth = localStorage.getItem("auth") === "true";
          if (!isAuth) {
            throw new Response("Unauthorized", { status: 302, headers: { Location: "/" } });
          }
          return null;
        },
        element: <EditPage />
      }
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/signup",
    element: <SignupPage />,
  },

]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
    <Toaster position='top-center' />
  </StrictMode>,
)
