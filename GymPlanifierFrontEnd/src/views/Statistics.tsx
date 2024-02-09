import {Fragment, useEffect, useState} from "react";
import HeaderPage from "../components/HeaderPage.tsx";
import {CircularProgress, Stack, Typography} from "@mui/joy";
import {Area, AreaChart, CartesianGrid, Legend, Scatter, ScatterChart, Tooltip, XAxis, YAxis, ZAxis} from "recharts";
import axios from "../api/axios.ts";

export default function Statistics() {
  const workoutTypes = ["", "Chest", "Back", "Shoulders", "Arms", "Legs" ,"Cardio"]
  const days = ["","Monday", "Tuesday", "Wednesday" , "Thursday", "Friday", "Saturday", "Sunday"]
  const [chartData, setChartData] = useState<Array<any>>(null)
  const [secondChartData, setSecondChartData] = useState<Array<any>>(null)
  const [loading, setLoading] = useState(false)

  const getChartData = async (allUsers: boolean = false) => {
    setLoading(true)
    await axios.get('/statistics', {params:{allUsers: allUsers}}).then((response) => {
      //@ts-ignore
      allUsers ? setSecondChartData(response.data) : setChartData(response.data);
      setLoading(false)
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
      <HeaderPage headerText={'Statistics'} headerSmallText={'Below we can see a comparison between most usual type of workouts that you do based on every day vs the ones done by the other members of the gym'}/>

      <h4>Most usual type of workout done by you</h4>
      {!loading ?
      <AreaChart
        width={1500}
        height={300}
        data={chartData}
        syncId="anyId"
        margin={{
          top: 10,
          right: 30,
          left: 20,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="x" type="category" name="Day" domain={days}/>
        <YAxis dataKey="y" type="category" name="Workout type" domain={workoutTypes}/>
        <Tooltip />
        <Area type="monotone" dataKey="y"  stroke="#8884d8" fill="#8884d8" />
      </AreaChart>
      :
      <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '10rem', marginTop: '10rem'}}>
        <CircularProgress size={"lg"}/>
      </div>
      }

      <h4>Most usual type of workout done by other people</h4>
      {!loading ?
      <AreaChart
        width={1500}
        height={300}
        data={secondChartData}
        syncId="anyId"
        margin={{
          top: 10,
          right: 30,
          left: 20,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="x" type="category" name="Day" domain={days}/>
        <YAxis dataKey="y" type="category" name="Workout type" domain={workoutTypes}/>
        <Tooltip />
        <Area type="monotone" dataKey="y"  stroke="#82ca9d" fill="#82ca9d" />
      </AreaChart>
      :
      <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '10rem', marginTop: '10rem'}}>
        <CircularProgress size={"lg"}/>
      </div>
      }
    </Fragment>
  )
}
