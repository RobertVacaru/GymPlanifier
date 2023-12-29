import {Route, Routes} from "react-router-dom";
import DailyWorkouts from "./views/DailyWorkouts.tsx";
import Login from "./views/Login.tsx";
import Register from "./views/Register.tsx";
import DefaultLayout from "./components/DefaultLayout.tsx";
import GuestLayout from "./components/GuestLayout.tsx";
import MyWorkouts from "./views/MyWorkouts.tsx";
import AddWorkout from "./views/AddWorkout.tsx";
import Statistics from "./views/Statistics.tsx";
import MainPage from "./views/MainPage.tsx";

function App() {

  return (
    <>
      <Routes>
        <Route element={<DefaultLayout/>}>
          <Route path="/" element={<MainPage/>}/>
        </Route>
        <Route element={<DefaultLayout/>}>
          <Route path="/dailyWorkouts" element={<DailyWorkouts/>}/>
        </Route>
        <Route element={<DefaultLayout/>}>
          <Route path="/myWorkouts" element={<MyWorkouts/>}/>
        </Route>
        <Route element={<DefaultLayout/>}>
          <Route path="/addWorkout" element={<AddWorkout/>}/>
        </Route>
        <Route element={<DefaultLayout/>}>
          <Route path="/statistics" element={<Statistics/>}/>
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
