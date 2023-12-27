import {Fragment, useEffect, useState} from "react";
import HeaderPage from "../components/HeaderPage.tsx";
import {Stack, Typography} from "@mui/joy";
import {CartesianGrid, Legend, Scatter, ScatterChart, Tooltip, XAxis, YAxis, ZAxis} from "recharts";
import axios from "../api/axios.ts";

export default function Statistics() {
  const workoutTypes = ["Chest", "Back", "Shoulders", "Arms", "Legs" ,"Cardio"]
  const days = ["Monday", "Tuesday", "Wednesday" , "Thursday", "Friday", "Saturday", "Sunday"]
  const [chartData, setChartData] = useState<Array<any>>(null)

  const getChartData = async () => {
    await axios.get('/statistics').then((response) => {
      setChartData(response.data)
    });
  }

  useEffect(()=>{
    if(chartData === null){
      getChartData()
    }
  }, [chartData])

  return(
    <Fragment>
      <HeaderPage headerText={'Statistics'} headerSmallText={'Check out statistics based on your workouts'}/>
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
          Type of workouts distribution based on your workouts
        </Typography>
      </Stack>

      <ScatterChart
        width={1500}
        height={500}
        margin={{
          top: 20,
          right: 20,
          bottom: 10,
          left: 30,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="x" type="category" name="Day" allowDuplicatedCategory={false} domain={days}/>
        <YAxis dataKey="y" type="category" name="Workout type" allowDuplicatedCategory={false} domain={workoutTypes}/>
        <ZAxis dataKey="z" type="category" name="Hour Interval" />
        <Tooltip cursor={{ strokeDasharray: '3 3' }} />
        <Legend />
        <Scatter name="Most common workout done based on day" data={chartData} fill="#8884d8" />
      </ScatterChart>
    </Fragment>
  )
}
