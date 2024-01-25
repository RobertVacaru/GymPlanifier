import {Fragment} from 'react';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardActions from '@mui/joy/CardActions';
import Typography from '@mui/joy/Typography';
import {Stack} from "@mui/joy";
import {useNavigate} from "react-router";
import {Layers, List, Plus, BarChart2} from "react-feather";
import Divider from "@mui/joy/Divider";

export default function MainPage() {
  const navigate = useNavigate();
  return (
    <Fragment>
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
          Home page
        </Typography>
      </Stack>
      <Stack
        direction={{
          xs: 'column',
          sm: 'row',
        }}
        justifyContent="center"
      >
        <Typography
          level="h4"
          textColor="neutral.500"
        >
          Below you can navigate through the application using the given cards
        </Typography>
      </Stack>
      <Divider/>
      <Stack spacing={{xs: 1, sm: 4}} direction="row" flexWrap="wrap" useFlexGap justifyContent="center" mt={16}>
        <Card
          variant="outlined"
          sx={{
            width: 320,
            // to make the card resizable
            overflow: 'auto',
            resize: 'horizontal',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Layers className="text-primary" style={{width: "48px" ,height: "48px", color: "blue"}} />
          </Box>
          <CardContent>
            <Typography level="title-lg">Daily Workouts</Typography>
            <Typography level="body-sm">
              Here you can navigate through the workouts that are scheduled by the users today and also log your own workout
            </Typography>
          </CardContent>
          <CardActions buttonFlex="0 1 120px">
            <Button variant="solid" color="primary" onClick={() => navigate('/dailyWorkouts')}>
              View
            </Button>
          </CardActions>
        </Card>
        <Card
          variant="outlined"
          sx={{
            width: 320,
            // to make the card resizable
            overflow: 'auto',
            resize: 'horizontal',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <List className="text-primary" style={{width: "48px" ,height: "48px", color: "blue"}} />
          </Box>
          <CardContent>
            <Typography level="title-lg">My workouts</Typography>
            <Typography level="body-sm">
              Here you can navigate through all of your workouts.
              You can also edit or delete the workouts.
            </Typography>
          </CardContent>
          <CardActions buttonFlex="0 1 120px">
            <Button variant="solid" color="primary" onClick={() => navigate('/myWorkouts')}>
              View
            </Button>
          </CardActions>
        </Card>
      </Stack>
      <Stack spacing={{xs: 1, sm: 4}} direction="row" flexWrap="wrap" useFlexGap justifyContent="center" mt={4}>
        <Card
          variant="outlined"
          sx={{
            width: 320,
            // to make the card resizable
            overflow: 'auto',
            resize: 'horizontal',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Plus className="text-primary" style={{width: "48px" ,height: "48px", color: "blue"}} />
          </Box>
          <CardContent>
            <Typography level="title-lg">Add Workout</Typography>
            <Typography level="body-sm">
              Here you can add a workout for today or the upcoming days
            </Typography>
          </CardContent>
          <CardActions buttonFlex="0 1 120px">
            <Button variant="solid" color="primary" onClick={() => navigate('/addWorkout')}>
              View
            </Button>
          </CardActions>
        </Card>
        <Card
          variant="outlined"
          sx={{
            width: 320,
            // to make the card resizable
            overflow: 'auto',
            resize: 'horizontal',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <BarChart2 className="text-primary" style={{width: "48px" ,height: "48px", color: "blue"}} />
          </Box>
          <CardContent>
            <Typography level="title-lg">Statistics</Typography>
            <Typography level="body-sm">
              Here you can navigate through a bunch of statistics based on the workouts that you have done in the past.
            </Typography>
          </CardContent>
          <CardActions buttonFlex="0 1 120px">
            <Button variant="solid" color="primary" onClick={() => navigate('/statistics')}>
              View
            </Button>
          </CardActions>
        </Card>
      </Stack>
    </Fragment>
  );
}
