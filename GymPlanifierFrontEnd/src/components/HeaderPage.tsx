import {Divider, Stack, Typography} from "@mui/joy";
import {Fragment} from "react";

export default function HeaderPage (){
  return(
    <Fragment>
      <Stack
        direction={{
          xs: 'column',
          sm: 'row',
        }}
        justifyContent="space-between"
        alignItems="flex-start"
        spacing={2}
      >
        <div>
          <Typography
            level="h1"
            fontSize={{
              xs: 'xl2',
              md: 'xl4',
            }}
          >
            Today's gym scheduled workouts charts
          </Typography>
          <Typography level="body-md" color="neutral">
            Input your preferred workout and time availability
          </Typography>
        </div>
      </Stack>
      <Divider className={"mb-4"}/>
    </Fragment>
  );
}
