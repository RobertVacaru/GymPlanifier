import {Route, Routes} from "react-router-dom";
import Users from "./views/Users.tsx";
import Login from "./views/Login.tsx";
import Register from "./views/Register.tsx";
import DefaultLayout from "./components/DefaultLayout.tsx";
import GuestLayout from "./components/GuestLayout.tsx";

function App() {

  return (
    <>
      <Routes>
        <Route element={<DefaultLayout/>}>
          <Route path="/" element={<Users/>}/>
        </Route>
        <Route element={<GuestLayout/>}>
          <Route path="/login" element={<Login/>}/>
        </Route>
        <Route element={<GuestLayout/>}>
          <Route path="/register" element={<Register/>}/>
        </Route>
      </Routes>
    </>
  )
}

export default App
