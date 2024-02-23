import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import HomePage from '../components/HomePage/HomePage';
import Layout from './Layout';
import MovieDetails from '../components/MovieDetails/MovieDetails';
import ProfilePage from '../components/ProfilePage/ProfilePage';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "login",
        element: <LoginFormPage />,
      },
      {
        path: "signup",
        element: <SignupFormPage />,
      },
      {
        path:"movies/:movieId",
        element:<MovieDetails />
      },
      {
        path:'profile/:profileId',
        element:<ProfilePage />
      }
    ],
  },
]);