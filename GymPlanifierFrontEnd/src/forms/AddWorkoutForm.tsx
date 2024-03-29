import {
  Divider,
  FormLabel,
  Input,
  Option,
  Select,
  Slider,
  Textarea,
  Typography,
  CircularProgress
} from "@mui/joy";
import {Form} from "react-bootstrap";
import {Controller, useForm} from "react-hook-form";
import {Fragment, SyntheticEvent, useEffect, useState} from "react";
import useAuthContext from "../contexts/AuthContext.tsx";
import UserInterface from "../Interfaces/UserInterface.tsx";
import WorkoutDefaults from "../components/helpers/WorkoutDefaults.tsx";
import axios from "../api/axios.ts";
import Button from "@mui/joy/Button";
import Box from "@mui/joy/Box";

interface Workout {
  workoutModal?: boolean,
  setWorkoutModal?: Function,
  workoutId?: number|null,
  hourInterval?: string|null,
  workoutType?: string|null
  refreshData?: Function,
  goTo?: Function
}

export default function AddWorkoutForm(props?: Workout) {
  const userContext  = useAuthContext();
  // @ts-ignore
  const  user :UserInterface = userContext?.user;

  const valueText = (value: number) => {
    return `${Math.floor(value)}:${((value - Math.floor(value)) * 60) !== 0 ? (value - Math.floor(value)) * 60 : '00'}`
  }

  const workouts = [ {value: 1, label: 'Back'}, {value: 2, label: 'Chest'}, {value: 3, label: 'Legs'}, {value: 4, label: 'Shoulders'}, {value: 5, label: 'Cardio'}, {value: 6, label: "Arms"}];
  const [marks, setMarks] = useState([{value: 10, label: valueText(10)}, {value: 12, label: valueText(12)}]);
  const [suggestionMarks, setSuggestionMarks] = useState([{value: 8, label: valueText(8)}, {value: 22, label: valueText(22)}]);
  const [workoutData, setWorkoutData] = useState(null)
  const [hourInterval, setHourInterval] = useState<Array<number>>([10,12])
  const [suggestionHourInterval, setSuggestionHourInterval] = useState<Array<number>>([8,22])
  const [loading, setLoading] = useState(false)
  const [workoutType, setWorkoutType] = useState<any>('')
  const [day, setDay] =  useState(new Date().toISOString().split('T')[0])

  const {
    handleSubmit,
    formState: {errors},
    setError,
    setValue,
    getValues,
    control
  } = useForm({
    defaultValues: new WorkoutDefaults()
  });

  useEffect(() => {
    if(props?.hourInterval){
      let [start, end] = props.hourInterval.split('-');
      [start, end] = [start.split(':')[0], end.split(':')[0]]
      setHourInterval([Number(start),Number(end)])
      setMarks([{value: Number(start), label: start}, {value: Number(end), label: end}])
    }
  }, [props?.hourInterval]);

  const setValuesForMarks = (values: []|any) => {
    // you will always have two
    let newMarks = values.map((value: number) => {
      return {value: value, label: valueText(value)}
    })
    setMarks(newMarks)
    setHourInterval([newMarks[0].value, newMarks[1].value])
  }

  const setValuesForSuggestionMarks = (values: []) => {
    // you will always have two
    let newMarks = values.map((value: number) => {
      return {value: value, label: valueText(value)}
    })
    setSuggestionMarks(newMarks)
    setSuggestionHourInterval([newMarks[0].value, newMarks[1].value])
  }

  const cleanHourInterval = (data: any, marks: any, hourInterval: string) => {
    data[hourInterval] = marks;
    if(data[hourInterval][0].label){
      data[hourInterval][0] = data[hourInterval][0].value
      data[hourInterval][1] = data[hourInterval][1].value
    }
    return data;
  }

  const submit = async (data: any) => {
    data = cleanHourInterval(data, marks, 'hourInterval');
    try {
      setLoading(true)
      await axios.post(`/workouts/${user.id}/add`, data).then(() => {
        if (props?.setWorkoutModal){
          props.setWorkoutModal(false)
        }
        if(props?.refreshData) {
          props.refreshData(true)
        }
        if(props?.goTo){
          props.goTo()
        }
        setLoading(false)
      });
    } catch (e: any) {
      if (e.response && e.response.status === 422) {
        // @ts-ignore
        setError(e.response.data.errors);
      }
    }
  }

  const getSuggestion = async (data: any) => {
    data = cleanHourInterval(data, suggestionMarks, 'hourIntervalSuggestion')
    setLoading(true)
    await axios.post('/suggestion', data).then((response) => {
      setHourInterval(response.data.interval)
      setValuesForMarks(response.data.interval)
      let workout: any =  workouts.filter((workout:any) => {
          if(workout.label === response.data.workoutType) {
            return workout
          }
        }
      )[0]
      setWorkoutType(workout.value)
      setValue('workoutType', {value: workout.value, label: workout.label})
      setDay(new Date(response.data.date).toISOString().split('T')[0])
      setLoading(false)
      setSuggestionMarks([{value: 8, label: valueText(8)}, {value: 22, label: valueText(22)}])
      setSuggestionHourInterval([8,22])
  })}

  const getWorkoutData = async () => {
    setLoading(true)
    await axios.get('/workouts/' + props.workoutId ).then((response) => {
      setWorkoutData(response.data[0])
      setValuesForMarks([response.data[0].startingHour, response.data[0].finishHour])
      let workout: any =  workouts.filter((workout:any) => {
          if(workout.label === response.data[0].type) {
            return workout
          }
        }
      )[0]
      setWorkoutType(workout.value)
      setValue('workoutType', {value: workout.value, label: workout.label})
      setDay(new Date(response.data[0].date).toISOString().split('T')[0])
      setLoading(false)
      setSuggestionMarks([{value: 8, label: valueText(8)}, {value: 22, label: valueText(22)}])
      setSuggestionHourInterval([8,22])
    });
  }

  const edit = async (data: any) => {
    data = cleanHourInterval(data, marks, 'hourInterval');
    let newData = {workoutId: props?.workoutId ,dateWorkout: data.dateWorkout, description: data.description, hourInterval: hourInterval, workoutType: data.workoutType}
    try {
      setLoading(true)
      await axios.patch(`/workouts/${user.id}/patch`, newData).then(() => {
        if (props?.setWorkoutModal){
          props.setWorkoutModal(false)
        }
        if(props?.refreshData) {
          props.refreshData(true)
        }
        if(props?.goTo){
          props.goTo()
        }
        setLoading(false)
      });
    } catch (e: any) {
      if (e.response && e.response.status === 422) {
        // @ts-ignore
        setError(e.response.data.errors);
      }
    }
  }

  useEffect(() => {
    if (props.workoutId && !workoutData) {
      getWorkoutData()
    }
  }, [props.workoutId]);

  return (
        loading ?
          <div style={{height: '600px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <CircularProgress size={"lg"}/>
          </div>
        :
    <Fragment>
      <Form onSubmit={handleSubmit((data) => props.workoutId ? edit(data) : submit(data))}>
        <Form.Group controlId="datePicker" className={"form-group"}>
          <FormLabel className={"label"}>Input your preferred date*</FormLabel>
          <Input
            type="date"
            slotProps={{
              input: {
                max: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 7).toISOString().split('T')[0]
              }
            }}
            defaultValue={day}
            onChange={(e) => setValue('dateWorkout', e?.target?.value)}
          />
        </Form.Group>
        <Form.Group controlId="formSelect" className={"form-group"}>
          <FormLabel className={"label"}>Input your preferred workout type*</FormLabel>
          <Controller
            name="workoutType"
            control={control}
            render={(field: { onChange, onBlur, value }) => (
              <Select
                onChange={(event: SyntheticEvent | null,
                           newValue: Array<string> | null) => {
                  setWorkoutType(newValue)
                  setValue('workoutType', event?.target?.outerText)
                }}
                value={workoutType ?? ""}
              >
                {workouts.map((workout: any) => {
                  return (<Option value={workout.value}>{workout.label}</Option>)
                })}
              </Select>
            )}
          />
        </Form.Group>
        <Form.Group controlId={"formSlider"} className={"form-group"}>
          <FormLabel className={"label"}>Input your preferred time interval*</FormLabel>
          <Slider
            id='hourSlider'
            getAriaLabel={() => 'Workout Time interval'}
            min={8}
            max={22}
            step={0.5}
            value={hourInterval}
            onChange={(e) => {
              // @ts-ignore
              setValuesForMarks(e?.target.value)
            }}
            valueLabelDisplay="off"
            marks={marks}
          />
        </Form.Group>
        <Form.Group controlId={"formDescription"} className={"form-group"}>
          <FormLabel className={"label"}>Input additional info about the workout</FormLabel>
          <Controller
            name="description"
            control={control}
            render={(field: { onChange, onBlur, value }) => (
              <Textarea
                minRows={3}
                {...field}
                onChange={(e) => setValue('description', e?.target?.value)}
              />
            )}
          />
        </Form.Group>
        <Box textAlign='center'>
          <Button type={"submit"} sx={{width: '50%'}}>Submit</Button>
        </Box>
      </Form>

      <br/>
      <br/>
      <Typography id="variant-modal-title" level={props?.goTo ? "h3" : "h2"} textColor="inherit" textAlign={'center'}>
          ↓ Below you can get a suggestion for a workout ↓
      </Typography>
      <Divider/>
      <br/>
      <Form onSubmit={handleSubmit((data: WorkoutDefaults) => getSuggestion(data))}>
      <Form.Group controlId="formSelect" className={"form-group"}>
        <FormLabel className={"label"}>Input your preferred workout type for the suggestion</FormLabel>
        <Controller
          name="workoutTypeSuggestion"
          control={control}
          render={(field: { onChange, onBlur, value }) => (
            <Select
              onChange={(e) => {
                setValue('workoutTypeSuggestion', e?.target?.outerText)
              }}
              defaultValue={props?.workoutType ?? field.value}
            >
              {workouts.map((workout: any) => {
                return (<Option value={workout.value}>{workout.label}</Option>)
              })}
            </Select>
          )}
        />
      </Form.Group>

      <Form.Group controlId={"formSlider"} className={"form-group"}>
        <FormLabel className={"label"}>Input your preferred time interval for the suggestion</FormLabel>
        <Slider
          id='hourSliderSuggestion'
          getAriaLabel={() => 'Workout Time interval'}
          min={8}
          max={22}
          step={0.5}
          value={suggestionHourInterval}
          onChange={(e) => {
            // @ts-ignore
            setValuesForSuggestionMarks(e?.target.value)
          }}
          valueLabelDisplay="off"
          marks={suggestionMarks}
        />
      </Form.Group>

      <Box textAlign='center'>
        <Button type={"submit"} sx={{width: '50%'}}>Give me suggestion</Button>
      </Box>
      </Form>
    </Fragment>
  );
}
