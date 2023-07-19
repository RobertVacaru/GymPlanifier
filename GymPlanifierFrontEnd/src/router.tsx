import {createBrowserRouter, Navigate} from "react-router-dom";
import Login from "./views/Login.tsx";
import NotFound from "./views/NotFound.tsx";
import GuestLayout from "./components/GuestLayout.tsx";
import SignUp from "./views/SignUp.tsx";
import DefaultLayout from "./components/DefaultLayout.tsx";
import Users from "./views/Users.tsx";

const router = createBrowserRouter([
  {
    path: '*',
    element: <NotFound/>
  },
  {
    path: '/',
    element: <DefaultLayout/>,
    children: [
      {
        path: '/',
        element: <Navigate to={'/users'}/>
      },
      {
        path: '/users',
        element: <Users/>
      }
    ]
  },
  {
    path: '/',
    element: <GuestLayout/>,
    children: [
      {
        path: '/login',
        element: <Login/>
      },
      {
        path: '/signup',
        element: <SignUp/>
      }
    ]
  }
])

export default router;
