/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from 'react';
import { ColorPaletteProp } from '@mui/joy/styles';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Chip from '@mui/joy/Chip';
import Divider from '@mui/joy/Divider';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import ModalClose from '@mui/joy/ModalClose';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import Table from '@mui/joy/Table';
import Sheet from '@mui/joy/Sheet';
import IconButton, { iconButtonClasses } from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';
import Menu from '@mui/joy/Menu';
import MenuButton from '@mui/joy/MenuButton';
import MenuItem from '@mui/joy/MenuItem';
import Dropdown from '@mui/joy/Dropdown';
// icons
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import SearchIcon from '@mui/icons-material/Search';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import BlockIcon from '@mui/icons-material/Block';
import AutorenewRoundedIcon from '@mui/icons-material/AutorenewRounded';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded';
import axios from "../api/axios.ts";
import {useEffect, useState} from "react";
import useAuthContext from "../contexts/AuthContext.tsx";
import WorkoutInterface from "../Interfaces/WorkoutInterface.tsx";
import Avatar from "@mui/joy/Avatar";
import Link from "@mui/joy/Link";

interface PropsWorkout {
  workoutPopUp: boolean,
  setWorkoutPopUp: Function,
  workoutId: number|null,
  setWorkoutId: Function,
}

export default function WorkoutsTable(props: PropsWorkout) {
  const [open, setOpen] = React.useState(false);
  const [workoutData, setWorkoutData] = useState<WorkoutInterface[]|null>(null);
  const {user} = useAuthContext();

  const getOwnerWorkoutData = async (page: number = 1) => {
    await axios.get('/workouts/'+ user.id +'/ownedByUser', {params: {page: page}}).then((response) => {
      console.log(response.data)
      setWorkoutData(response.data.data)
    });
  }

  useEffect(()=>{
    if(workoutData === null){
      getOwnerWorkoutData()
    }
  }, [workoutData])

  const cleanHour = (hour: string) => {
    if (hour.includes('.5')){
      return hour.slice(0, hour.indexOf('.')) + ':30'
    }

    return hour + ':00'
  }

  const getStatus = (startingHour: number, finishHour: number, date: string) => {
    const workoutDate: number = new Date(date).getDay()
    let actualDate: Date|number = new Date()
    const actualHour: number = actualDate.getHours()
    actualDate = actualDate.getDay()

    if (workoutDate < actualDate) {
      return "Finished"
    } else if (workoutDate > actualDate) {
      return "To be done"
    } else {
      if (actualHour < finishHour && actualHour > startingHour) {
        return "In progress"
      } else if (actualHour > finishHour) {
        return "Finished"
      } else if (actualHour < startingHour) {
        return "To be done"
      }
    }

    return "Finished"
  }

  const renderFilters = () => (
    <React.Fragment>
      <FormControl size="sm">
        <FormLabel>Status</FormLabel>
        <Select
          size="sm"
          placeholder="Filter by status"
          slotProps={{ button: { sx: { whiteSpace: 'nowrap' } } }}
        >
          <Option value="paid">Paid</Option>
          <Option value="pending">Pending</Option>
          <Option value="refunded">Refunded</Option>
          <Option value="cancelled">Cancelled</Option>
        </Select>
      </FormControl>

      <FormControl size="sm">
        <FormLabel>Category</FormLabel>
        <Select size="sm" placeholder="All">
          <Option value="all">All</Option>
          <Option value="refund">Refund</Option>
          <Option value="purchase">Purchase</Option>
          <Option value="debit">Debit</Option>
        </Select>
      </FormControl>

      <FormControl size="sm">
        <FormLabel>Customer</FormLabel>
        <Select size="sm" placeholder="All">
          <Option value="all">All</Option>
          <Option value="olivia">Olivia Rhye</Option>
          <Option value="steve">Steve Hampton</Option>
          <Option value="ciaran">Ciaran Murray</Option>
          <Option value="marina">Marina Macdonald</Option>
          <Option value="charles">Charles Fulton</Option>
          <Option value="jay">Jay Hoper</Option>
        </Select>
      </FormControl>
    </React.Fragment>
  );
  return (
    <React.Fragment>
      <Sheet
        className="SearchAndFilters-mobile"
        sx={{
          display: {
            xs: 'flex',
            sm: 'none',
          },
          my: 1,
          gap: 1,
        }}
      >
        <Input
          size="sm"
          placeholder="Search"
          startDecorator={<SearchIcon />}
          sx={{ flexGrow: 1 }}
        />
        <IconButton
          size="sm"
          variant="outlined"
          color="neutral"
          onClick={() => setOpen(true)}
        >
          <FilterAltIcon />
        </IconButton>
        <Modal open={open} onClose={() => setOpen(false)}>
          <ModalDialog aria-labelledby="filter-modal" layout="fullscreen">
            <ModalClose />
            <Typography id="filter-modal" level="h2">
              Filters
            </Typography>
            <Divider sx={{ my: 2 }} />
            <Sheet sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {renderFilters()}
              <Button color="primary" onClick={() => setOpen(false)}>
                Submit
              </Button>
            </Sheet>
          </ModalDialog>
        </Modal>
      </Sheet>
      <Box
        className="SearchAndFilters-tabletUp"
        sx={{
          borderRadius: 'sm',
          py: 2,
          display: {
            xs: 'none',
            sm: 'flex',
          },
          flexWrap: 'wrap',
          gap: 1.5,
          '& > *': {
            minWidth: {
              xs: '120px',
              md: '160px',
            },
          },
        }}
      >
        <FormControl sx={{ flex: 1 }} size="sm">
          <FormLabel>Search for order</FormLabel>
          <Input size="sm" placeholder="Search" startDecorator={<SearchIcon />} />
        </FormControl>
        {renderFilters()}
      </Box>
      <Sheet
        className="OrderTableContainer"
        variant="outlined"
        sx={{
          display: { xs: 'none', sm: 'initial' },
          width: '100%',
          borderRadius: 'sm',
          flexShrink: 1,
          overflow: 'auto',
          minHeight: 0,
        }}
      >
        <Table
          aria-labelledby="tableTitle"
          stickyHeader
          hoverRow
          sx={{
            '--TableCell-headBackground': 'var(--joy-palette-background-level1)',
            '--Table-headerUnderlineThickness': '1px',
            '--TableRow-hoverBackground': 'var(--joy-palette-background-level1)',
            '--TableCell-paddingY': '4px',
            '--TableCell-paddingX': '8px',
          }}
        >
          <thead>
          <tr>
            <th style={{ width: 140, padding: '12px 6px' }}>Date</th>
            <th style={{ width: 140, padding: '12px 6px' }}>Workout Type</th>
            <th style={{ width: 140, padding: '12px 6px' }}>Hour Interval</th>
            <th style={{ width: 140, padding: '12px 6px' }}>Status</th>
            <th style={{ width: 240, padding: '12px 6px' }}>User</th>
            <th style={{ width: 140, padding: '12px 6px' }}> </th>
          </tr>
          </thead>
          <tbody>
          {workoutData?.map((workout) => (
            <tr key={workout.id}>
              <td>
                <Typography level="body-xs">{workout.date}</Typography>
              </td>
              <td>
                <Typography level="body-xs">{workout.type}</Typography>
              </td>
              <td>
                <Typography level="body-xs">{cleanHour(workout.startingHour) + ' - ' + cleanHour(workout.finishHour)}</Typography>
              </td>
              <td>
                <Chip
                  variant="soft"
                  size="sm"
                  startDecorator={
                    {
                      "Finished": <CheckRoundedIcon />,
                      "In progress": <AutorenewRoundedIcon />,
                      "To be done": <BlockIcon />,
                    }[getStatus(Number(workout.startingHour), Number(workout.finishHour), workout.date)]
                  }
                  color={
                    {
                      "Finished": 'success',
                      "In progress": 'neutral',
                      "To be done": 'danger',
                    }[getStatus(Number(workout.startingHour), Number(workout.finishHour), workout.date)] as ColorPaletteProp
                  }
                >
                  {getStatus(Number(workout.startingHour), Number(workout.finishHour), workout.date)}
                </Chip>
              </td>
              <td>
                <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                  <Avatar size="sm">{user.name.slice(0,1).toUpperCase()}</Avatar>
                  <div>
                    <Typography level="body-xs">{user.name}</Typography>
                    <Typography level="body-xs">{user.email}</Typography>
                  </div>
                </Box>
              </td>
              <td>
                <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', float: 'right'}}>
                  <Dropdown>
                    <MenuButton
                      slots={{ root: IconButton }}
                      slotProps={{ root: { variant: 'plain', color: 'neutral', size: 'sm' } }}
                    >
                      <MoreHorizRoundedIcon />
                    </MenuButton>
                    <Menu size="sm" sx={{ minWidth: 140 }}>
                      <MenuItem onClick={() => {
                        props.setWorkoutPopUp(true)
                        props.setWorkoutId(workout.id)
                      }}>Edit</MenuItem>
                      <MenuItem>Rename</MenuItem>
                      <MenuItem>Move</MenuItem>
                      <Divider />
                      <MenuItem color="danger">Delete</MenuItem>
                    </Menu>
                  </Dropdown>
                </Box>
              </td>
            </tr>
          ))}
          </tbody>
        </Table>
      </Sheet>
      <Box
        className="Pagination-laptopUp"
        sx={{
          pt: 2,
          gap: 1,
          [`& .${iconButtonClasses.root}`]: { borderRadius: '50%' },
          display: {
            xs: 'none',
            md: 'flex',
          },
        }}
      >
        <Button
          size="sm"
          variant="outlined"
          color="neutral"
          startDecorator={<KeyboardArrowLeftIcon />}
        >
          Previous
        </Button>

        <Box sx={{ flex: 1 }} />
        {['1', '2', '3', '…', '8', '9', '10'].map((page) => (
          <IconButton
            key={page}
            size="sm"
            variant={Number(page) ? 'outlined' : 'plain'}
            color="neutral"
            onClick={() => getOwnerWorkoutData(Number(page))}
          >
            {page}
          </IconButton>
        ))}
        <Box sx={{ flex: 1 }} />

        <Button
          size="sm"
          variant="outlined"
          color="neutral"
          endDecorator={<KeyboardArrowRightIcon />}
        >
          Next
        </Button>
      </Box>
    </React.Fragment>
  );
}
