import {Divider, Stack, Typography} from "@mui/joy";
import {Fragment} from "react";

interface HeaderProps{
  headerText: string
  headerSmallText: string
}

export default function HeaderPage (props: HeaderProps){
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
            {props.headerText}
          </Typography>
          <Typography level="body-md" color="neutral">
            {props.headerSmallText}
          </Typography>
        </div>
      </Stack>
      <Divider className={"mb-4"}/>
    </Fragment>
  );
}
