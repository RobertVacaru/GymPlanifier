import {Fragment, useState} from "react";
import HeaderPage from "../components/HeaderPage.tsx";
import WorkoutsTable from "../components/WorkoutsTable.tsx";
import AddWorkoutPopUp from "../components/PopUps/AddWorkoutPopUp.tsx";

export default function MyWorkouts() {
  const [workoutPopUp, setWorkoutPopUp] = useState(false)
  const [workoutId, setWorkoutId] = useState(null)

  return(
    <Fragment>
      <HeaderPage headerText={'Today\'s gym scheduled workouts charts'} headerSmallText={'Input your preferred workout and time availability'}/>
      <WorkoutsTable workoutPopUp={workoutPopUp} setWorkoutPopUp={setWorkoutPopUp} workoutId={workoutId} setWorkoutId={setWorkoutId}/>
      <AddWorkoutPopUp workoutModal={workoutPopUp} setWorkoutModal={setWorkoutPopUp} workoutId={workoutId}/>
    </Fragment>
  )
}
