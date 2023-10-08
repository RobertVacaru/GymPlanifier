import {Fragment, useState} from "react";
import {BarChart, Bar, CartesianGrid, Legend, Tooltip, XAxis, YAxis} from "recharts";
import HeaderPage from "../components/HeaderPage";
import {Stack, Typography} from "@mui/joy";
import AddWorkoutPopUp from "../components/PopUps/AddWorkoutPopUp";
import axios from "../api/axios.ts";

const data = [
  {
    "name": "Page A",
    "People that scheduled their workouts for today": 4000,
    "Average people working out at that hour": 2400
  },
  {
    "name": "Page B",
    "People that scheduled their workouts for today": 3000,
    "Average people working out at that hour": 1398
  },
  {
    "name": "Page C",
    "People that scheduled their workouts for today": 2000,
    "Average people working out at that hour": 9800
  },
  {
    "name": "Page D",
    "People that scheduled their workouts for today": 2780,
    "Average people working out at that hour": 3908
  },
  {
    "name": "Page E",
    "People that scheduled their workouts for today": 1890,
    "Average people working out at that hour": 4800
  },
  {
    "name": "Page F",
    "People that scheduled their workouts for today": 2390,
    "Average people working out at that hour": 3800
  },
  {
    "name": "Page G",
    "People that scheduled their workouts for today": 3490,
    "Average people working out at that hour": 4300
  }
]
const getWorkoutForToday = async () => {
  await axios.get('/workoutsToday').then((response) => {
    console.log(response)
  });
}

getWorkoutForToday()

export default function MainPage() {
  const [workoutModal, setWorkoutModal] = useState<boolean>(false);

  return (
    <Fragment>
      <HeaderPage/>
      <Stack
        direction={{
          xs: 'column',
          sm: 'row',
        }}
        justifyContent="center"
      >
          <Typography
            level="h1"
            fontSize={{
              xs: 'xl2',
              md: 'xl4',
            }}
          >
            Workouts distribution over hours
          </Typography>
      </Stack>
      <BarChart width={1600} height={500} data={data}>
        <CartesianGrid strokeDasharray="3 3"/>
        <XAxis dataKey="name" />
        <YAxis/>
        <Tooltip/>
        <Legend/>
        <Bar dataKey="Average people working out at that hour" fill="#8884d8" onClick={() => setWorkoutModal(true)}/>
        <Bar dataKey="People that scheduled their workouts for today" fill="#82ca9d"/>
      </BarChart>

      <AddWorkoutPopUp
        workoutModal={workoutModal}
        setWorkoutModal={setWorkoutModal}
      />
    </Fragment>
  )
}
