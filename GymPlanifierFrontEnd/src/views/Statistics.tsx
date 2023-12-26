import { Fragment } from "react";
import HeaderPage from "../components/HeaderPage.tsx";
import {Stack, Typography} from "@mui/joy";
import {CartesianGrid, Legend, Scatter, ScatterChart, Tooltip, XAxis, YAxis, ZAxis} from "recharts";

export default function Statistics() {
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
        width={730}
        height={250}
        margin={{
          top: 20,
          right: 20,
          bottom: 10,
          left: 10,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="x" type="number" name="stature" unit="cm" />
        <YAxis dataKey="y" type="number" name="weight" unit="kg" />
        <ZAxis dataKey="z" type="number" range={[64, 144]} name="score" unit="km" />
        <Tooltip cursor={{ strokeDasharray: '3 3' }} />
        <Legend />
        <Scatter name="A school" data={} fill="#8884d8" />
        <Scatter name="B school" data={} fill="#82ca9d" />
      </ScatterChart>
    </Fragment>
  )
}
