import {Fragment} from "react";
import HeaderPage from "../components/HeaderPage.tsx";
import WorkoutsTable from "../components/WorkoutsTable.tsx";

export default function MyWorkouts() {
  return(
    <Fragment>
      <HeaderPage headerText={'Today\'s gym scheduled workouts charts'} headerSmallText={'Input your preferred workout and time availability'}/>
      <WorkoutsTable/>
    </Fragment>
  )
}
