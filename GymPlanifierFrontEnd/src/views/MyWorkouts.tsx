import {Fragment, useState} from "react";
import HeaderPage from "../components/HeaderPage.tsx";
import WorkoutsTable from "../components/WorkoutsTable.tsx";
import AddWorkoutPopUp from "../components/PopUps/AddWorkoutPopUp.tsx";

export default function MyWorkouts() {
  const [workoutPopUp, setWorkoutPopUp] = useState(false)
  const [workoutId, setWorkoutId] = useState(null)

  return(
    <Fragment>
      <HeaderPage headerText={'History of workouts'} headerSmallText={'Adjust workouts based on preference'}/>
      <WorkoutsTable workoutPopUp={workoutPopUp} setWorkoutPopUp={setWorkoutPopUp} workoutId={workoutId} setWorkoutId={setWorkoutId}/>
      <AddWorkoutPopUp workoutModal={workoutPopUp} setWorkoutModal={setWorkoutPopUp} workoutId={workoutId}/>
    </Fragment>
  )
}
