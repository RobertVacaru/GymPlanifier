import {Fragment, useEffect, useState} from "react";
import HeaderPage from "../components/HeaderPage.tsx";
import {Stack, Typography} from "@mui/joy";
import {Area, AreaChart, CartesianGrid, Legend, Scatter, ScatterChart, Tooltip, XAxis, YAxis, ZAxis} from "recharts";
import axios from "../api/axios.ts";

export default function Statistics() {
  const workoutTypes = ["Chest", "Back", "Shoulders", "Arms", "Legs" ,"Cardio"]
  const days = ["Monday", "Tuesday", "Wednesday" , "Thursday", "Friday", "Saturday", "Sunday"]
  const [chartData, setChartData] = useState<Array<any>>(null)
  const [secondChartData, setSecondChartData] = useState<Array<any>>(null)

  const getChartData = async (allUsers: boolean = false) => {
    await axios.get('/statistics', {params:{allUsers: allUsers}}).then((response) => {
      allUsers ? setSecondChartData(response.data) : setChartData(response.data);
    });
  }

  useEffect(()=>{
    if(chartData === null){
      getChartData()
    }
  }, [chartData])

  useEffect(() => {
    if (secondChartData === null){
      getChartData(true)
    }
  }, [secondChartData]);

  return(
    <Fragment>
      <HeaderPage headerText={'Statistics'} headerSmallText={'Check out statistics based on your workouts'}/>

      <h4>Type of workouts distribution based on your workouts</h4>
      <AreaChart
        width={1500}
        height={300}
        data={chartData}
        syncId="anyId"
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="x" type="category" name="Day" domain={days}/>
        <YAxis dataKey="y" type="category" name="Workout type" domain={workoutTypes}/>
        <Tooltip />
        <Area type="monotone" dataKey="y"  stroke="#8884d8" fill="#8884d8" />
      </AreaChart>

      <h4>Type of workouts distribution based on other people's workouts</h4>
      <AreaChart
        width={1500}
        height={300}
        data={chartData}
        syncId="anyId"
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="x" type="category" name="Day" domain={days}/>
        <YAxis dataKey="y" type="category" name="Workout type" domain={workoutTypes}/>
        <Tooltip />
        <Area type="monotone" dataKey="y"  stroke="#82ca9d" fill="#82ca9d" />
      </AreaChart>
    </Fragment>
  )
}
