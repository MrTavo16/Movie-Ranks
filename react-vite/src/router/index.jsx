import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import HomePage from '../components/HomePage/HomePage';
import Layout from './Layout';
import MovieDetails from '../components/MovieDetails/MovieDetails';
import ProfilePage from '../components/ProfilePage/ProfilePage';
import PostHome from '../components/PostHome/PostHome';
import PostDetails from '../components/PostDetails/PostDetails'

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
      },
      {
        path:'posts',
        element:<PostHome />
      },
      {
        path:'posts/:postId',
        element:<PostDetails />
      }
    ],
  },
]);