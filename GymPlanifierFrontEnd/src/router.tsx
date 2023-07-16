import {createBrowserRouter} from "react-router-dom";
import Login from "./views/Login.tsx";
import NotFound from "./views/NotFound.tsx";

const router = createBrowserRouter([
  {
    path: '',
    element: <NotFound/>
  }
  ,{
    path : '/login',
    element: <Login/>
  }
])

export default router;
