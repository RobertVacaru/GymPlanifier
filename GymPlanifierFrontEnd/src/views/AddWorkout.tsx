import AddWorkoutForm from "../forms/AddWorkoutForm.tsx";
import Box from "@mui/joy/Box";
import {Divider, Grid, Typography} from "@mui/joy";
import {Fragment} from "react";
import {useNavigate} from "react-router";

export default function AddWorkout() {
  const navigate = useNavigate();
  return (
    <Fragment>
      <Typography id="variant-modal-title" level="h2" textColor="inherit" textAlign={'center'}>
        Input your preferred workout for the day
      </Typography>
      <Divider/>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
      >
        <Grid xs={3}>
          <AddWorkoutForm goTo={() => navigate('/dailyWorkouts')}/>
        </Grid>
      </Grid>
    </Fragment>
  )
}
