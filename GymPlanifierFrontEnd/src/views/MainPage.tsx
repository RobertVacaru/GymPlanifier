import {Fragment useState} from "react";
import {BarChart, Bar, CartesianGrid, Legend, Tooltip, XAxis, YAxis} from "recharts";
import HeaderPage from "../components/HeaderPage";
import {Divider, FormLabel, Input, Modal, ModalClose, ModalDialog, Stack, Typography} from "@mui/joy";

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
        <Bar dataKey="Average people working out at that hour" fill="#8884d8" onClick={() => setWorkoutModal(true)} legend/>
        <Bar dataKey="People that scheduled their workouts for today" fill="#82ca9d"/>
      </BarChart>

      <Modal
        aria-labelledby="close-modal-title"
        open={workoutModal}
        onClose={() => setWorkoutModal(false)}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <ModalDialog
          aria-labelledby="variant-modal-title"
          aria-describedby="variant-modal-description"
          variant={"outlined"}
        >
          <ModalClose />
          <Typography id="variant-modal-title" level="h2" textColor="inherit">
            Modal Dialog
          </Typography>
          <Divider className={"mb-2"}/>
          <FormLabel>Input your preferred workout type</FormLabel>
          <Input>
          </Input>
        </ModalDialog>
      </Modal>
    </Fragment>
  )
}
