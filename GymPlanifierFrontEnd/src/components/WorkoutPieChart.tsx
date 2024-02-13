import React, {useEffect, useState} from 'react';
import {Cell, Legend, Pie, PieChart, Tooltip} from 'recharts';
import axios from "../api/axios.ts";
import {CircularProgress} from "@mui/joy";

export default function WorkoutPieChart(props: {setWorkoutType: Function, setWorkoutModal: Function, chartLoading: boolean|null}) {
    const [workoutData, setWorkoutData] = useState(null)
    const [workoutChartData, setWorkoutChartData] = useState<Array<any>>()
    const [loading, setLoading] = useState(false)

  useEffect(() => {
    if(props.chartLoading){
      getWorkoutForTodayByType()
    }
  }, [props.chartLoading]);

    const setChartData = (workoutData: any) => {
        let workoutArray = [];
        for(const key in workoutData){
            workoutArray.push({name: key, value: workoutData[key]['total']})
        }
        setWorkoutChartData(workoutArray)
        setTimeout(function(){
          setLoading(false)
        }, 1500);
    }

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FF0000', '#A020F0'];

    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({cx, cy, midAngle, innerRadius, outerRadius, percent, index}) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };

    const getWorkoutForTodayByType = async () => {
      setLoading(true)
        await axios.get('/workoutsToday/type').then((response) => {
            setWorkoutData(response.data)
            setChartData(response.data)
        });
    }

    useEffect(()=>{
        if(workoutData === null){
            getWorkoutForTodayByType()
        }
    }, [workoutData])

    return (
      !loading ?
        <PieChart width={1600} height={800}>
            <Legend verticalAlign="top" iconSize={20} fontSize={30}/>
            <Pie
                data={workoutChartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={300}
                fill="#8884d8"
                dataKey="value"
            >
                {workoutChartData?.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} onClick={() => {
                      props.setWorkoutType(entry.name)
                      props.setWorkoutModal(true)
                    }}/>
                ))}
            </Pie>
          <Tooltip />
        </PieChart>
      :
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '10rem', marginTop: '10rem'}}>
          <CircularProgress size={"lg"}/>
        </div>
    );
}
