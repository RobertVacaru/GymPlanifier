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
  const [workoutTypeFilter, setWorkoutTypeFilter] = useState(null)
  const [statusTypeFilter, setStatusTypeFilter] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const {user} = useAuthContext();

  const getOwnerWorkoutData = async (page: number = 1, workoutTypeFilter: string = '', statusTypeFilter: string = '') => {
    let params = {}
    if(workoutTypeFilter || statusTypeFilter){
      params = {params: {page: page, workoutTypeFilter: workoutTypeFilter ?? '', statusFilter: statusTypeFilter ?? ''}}
    } else {
      params = {params: {page: page}}
    }
    await axios.get('/workouts/'+ user.id +'/ownedByUser', params).then((response) => {
      console.log(response)
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
    const workoutDate: number|string = new Date(date).toLocaleDateString()

    let actualDate: Date|number|string = new Date()
    const actualHour: number = actualDate.getHours()
    actualDate = actualDate.toLocaleDateString()

    if (workoutDate < actualDate || (workoutDate === actualDate && actualHour > finishHour)) {
      return "Finished"
    } else if (workoutDate > actualDate || (workoutDate === actualDate && actualHour < startingHour)) {
      return "To be done"
    } else {
      return "In progress"
    }
  }

  const renderFilters = () => (
    <React.Fragment>
      <FormControl size="sm">
        <FormLabel>Status</FormLabel>
        <Select
          size="sm"
          placeholder="Filter by status"
          slotProps={{ button: { sx: { whiteSpace: 'nowrap' } } }}
          onChange={(e) => {
            setStatusTypeFilter(e?.target?.textContent)
            getOwnerWorkoutData(currentPage, workoutTypeFilter ?? '', e?.target?.textContent)
          }}
        >
          <Option value="all">All</Option>
          <Option value="finished">Finished</Option>
          <Option value="toBeDone">To be done</Option>
          <Option value="inProgress">In progress</Option>
        </Select>
      </FormControl>

      <FormControl size="sm">
        <FormLabel>Workout Type</FormLabel>
        <Select size="sm" placeholder="All" onChange={(e) => {
          setWorkoutTypeFilter(e?.target?.textContent)
          getOwnerWorkoutData(currentPage, e?.target?.textContent, statusTypeFilter ?? '')
        }}>
          <Option value="all">All</Option>
          <Option value="back">Back</Option>
          <Option value="chest">Chest</Option>
          <Option value="legs">Legs</Option>
          <Option value="shoulders">Shoulders</Option>
          <Option value="cardio">Cardio</Option>
          <Option value="arms">Arms</Option>
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
          justifyContent: 'flex-end',
          gap: 1.5,
          '& > *': {
            minWidth: {
              xs: '120px',
              md: '160px',
            },
          },
        }}
      >
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
            <th style={{ width: 250, padding: '12px 6px' }}><Typography level="body-md">Date</Typography></th>
            <th style={{ width: 250, padding: '12px 6px' }}><Typography level="body-md">Workout Type</Typography></th>
            <th style={{ width: 250, padding: '12px 6px' }}><Typography level="body-md">Hour </Typography></th>
            <th style={{ width: 250, padding: '12px 6px' }}><Typography level="body-md">Status</Typography></th>
            <th style={{ width: 200, padding: '12px 6px' }}><Typography level="body-md">User</Typography></th>
            <th style={{ width: 100}}> </th>
          </tr>
          </thead>
          <tbody>
          {workoutData?.map((workout) => (
            <tr key={workout.id}>
              <td>
                <Typography level="body-md">{workout.date}</Typography>
              </td>
              <td>
                <Typography level="body-md">{workout.type}</Typography>
              </td>
              <td>
                <Typography level="body-md">{cleanHour(workout.startingHour) + ' - ' + cleanHour(workout.finishHour)}</Typography>
              </td>
              <td>
                <Chip
                  variant="soft"
                  size="md"
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
                  <Avatar size="md">{user.name.slice(0,1).toUpperCase()}</Avatar>
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
          onClick={() => {
            setCurrentPage(currentPage - 1)
            getOwnerWorkoutData(currentPage - 1)
          }}
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
            onClick={() => {
              setCurrentPage(Number(page))
              getOwnerWorkoutData(Number(page))
            }
          }
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
          onClick={() => {
            setCurrentPage(currentPage + 1)
            getOwnerWorkoutData(currentPage + 1)
          }}
        >
          Next
        </Button>
      </Box>
    </React.Fragment>
  );
}
