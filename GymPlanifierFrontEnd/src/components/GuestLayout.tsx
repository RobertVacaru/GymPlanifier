import {Navigate, Outlet} from "react-router-dom";
import useAuthContext from "../contexts/AuthContext.tsx";

export default function GuestLayout() {
  const {user} = useAuthContext();

  return !user ? <Outlet/> : <Navigate to={'/'}/>
}
