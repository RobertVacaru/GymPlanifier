import {Fragment, useEffect, useState} from "react";
import {BarChart, Bar, CartesianGrid, Legend, Tooltip, XAxis, YAxis, ResponsiveContainer} from "recharts";
import HeaderPage from "../components/HeaderPage";
import {Stack, Typography} from "@mui/joy";
import AddWorkoutPopUp from "../components/PopUps/AddWorkoutPopUp";
import WorkoutPieChart from "../components/WorkoutPieChart.tsx";
import axios from "../api/axios.ts";
import { Row } from "react-bootstrap";
import Divider from "@mui/joy/Divider";

export default function MainPage() {
  const [workoutModal, setWorkoutModal] = useState<boolean>(false)
  const [workouts, setWorkouts] = useState(null)
  const [chartData, setChartData] = useState<Array<any>>()
  const [hourInterval, setHourInterval] = useState('')
  const [refreshData, setRefreshData] = useState<boolean|null>()

  const getWorkoutForToday = async () => {
    await axios.get('/workoutsToday').then((response) => {
      setChartData(getChartData(response.data))
      setWorkouts(response.data)
    });
  }

  useEffect(()=>{
    if(workouts === null){
      getWorkoutForToday()
    }
  }, [workouts])

    useEffect(() => {
        if(refreshData === true){
            getWorkoutForToday().then(() => {
                setRefreshData(false)
            })
        }
    }, [refreshData]);

  const getChartData = (workouts: { [x: string]: string | any[]; }) => [
      {
        "name": "8:00-10:00",
        "People that scheduled their workouts for today":  workouts['8:00']?.length,
        "Average people working out at that hour": 5
      },
      {
        "name": "10:00-12:00",
        "People that scheduled their workouts for today": workouts['10:00']?.length,
        "Average people working out at that hour": 3
      },
      {
        "name": "12:00-14:00",
        "People that scheduled their workouts for today": workouts['12:00']?.length,
        "Average people working out at that hour": 9
      },
      {
        "name": "14:00-16:00",
        "People that scheduled their workouts for today": workouts['14:00']?.length,
        "Average people working out at that hour": 3
      },
      {
        "name": "16:00-18:00",
        "People that scheduled their workouts for today": workouts['16:00']?.length,
        "Average people working out at that hour": 4
      },
      {
        "name": "18:00-20:00",
        "People that scheduled their workouts for today": workouts['18:00']?.length,
        "Average people working out at that hour": 3
      },
      {
        "name": "20:00-22:00",
        "People that scheduled their workouts for today": workouts['20:00']?.length,
        "Average people working out at that hour": 4
      }
    ]

  return (
    <Fragment>
      <HeaderPage headerText={'Today\'s gym scheduled workouts charts'} headerSmallText={'Input your preferred workout and time availability'}/>
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
        <BarChart width={1600} height={500} data={chartData} key={`rc_${chartData}`}>
          <CartesianGrid strokeDasharray="3 3"/>
          <XAxis dataKey="name"/>
          <YAxis domain={[0,30]}/>
          <Tooltip/>
          <Legend/>
          <Bar dataKey="Average people working out at that hour" fill="#8884d8" onClick={(val) => {
            setWorkoutModal(true)
            setHourInterval(val.name)
          }}/>
          <Bar dataKey="People that scheduled their workouts for today" fill="#82ca9d"/>
        </BarChart>
        <Divider />

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
                Type of workouts distribution
            </Typography>
        </Stack>
        <WorkoutPieChart/>

        <AddWorkoutPopUp
            workoutModal={workoutModal}
            setWorkoutModal={setWorkoutModal}
            hourInterval={hourInterval}
            refreshData={setRefreshData}
        />
    </Fragment>
  )
}
