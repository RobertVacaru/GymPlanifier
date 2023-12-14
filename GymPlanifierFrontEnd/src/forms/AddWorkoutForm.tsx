import {Divider, FormLabel, Input, Option, Select, Slider, Textarea, Typography} from "@mui/joy";
import {Form} from "react-bootstrap";
import {Controller, useForm} from "react-hook-form";
import {Fragment, useEffect, useState} from "react";
import useAuthContext from "../contexts/AuthContext.tsx";
import UserInterface from "../Interfaces/UserInterface.tsx";
import WorkoutDefaults from "../components/helpers/WorkoutDefaults.tsx";
import axios from "../api/axios.ts";

interface Workout {
  workoutModal?: boolean,
  setWorkoutModal?: Function,
  workoutId?: number|null,
  hourInterval?: string|null,
  refreshData?: Function
}

export default function AddWorkoutForm(props?: Workout) {
  const userContext  = useAuthContext();
  // @ts-ignore
  const  user :UserInterface = userContext?.user;

  const valueText = (value: number) => {
    return `${Math.floor(value)}:${((value - Math.floor(value)) * 60) !== 0 ? (value - Math.floor(value)) * 60 : '00'}`
  }

  const workouts = [{value: 1, label: 'Back'}, {value: 2, label: 'Chest'}];
  const [marks, setMarks] = useState([{value: 10, label: valueText(10)}, {value: 12, label: valueText(12)}]);
  const [workoutData, setWorkoutData] = useState(null)
  const [hourInterval, setHourInterval] = useState<Array<number>>([10,12])

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
  const setValuesForMarks = (values: []) => {
    // you will always have two
    let newMarks = values.map((value: number) => {
      return {value: value, label: valueText(value)}
    })
    setMarks(newMarks)
    setHourInterval([newMarks[0].value, newMarks[1].value])
  }
  const cleanHourInterval = (data: any) => {
    data.hourInterval = marks;
    if(data.hourInterval[0].label){
      data.hourInterval[0] = data.hourInterval[0].value
      data.hourInterval[1] = data.hourInterval[1].value
    }
    return data;
  }

  const submit = async (data: any) => {
    data = cleanHourInterval(data);
    try {
      await axios.post(`/workouts/${user.id}/add`, data).then(() => {
        props.setWorkoutModal(false)
        if(props?.refreshData) {
          props.refreshData(true)
        }
      });
    } catch (e: any) {
      if (e.response && e.response.status === 422) {
        // @ts-ignore
        setError(e.response.data.errors);
      }
    }
  }

  const getWorkoutData = async () => {
    await axios.get('/workouts/' + props.workoutId ).then((response) => {
      setWorkoutData(response.data)
    });
  }

  useEffect(() => {
    if (props.workoutId && !workoutData) {
      getWorkoutData()
    }
  }, [props.workoutId]);

  return (
    <Fragment>
      <Typography id="variant-modal-title" level="h2" textColor="inherit">
        Input your preferred workout for the day
      </Typography>
      <Divider className={"mb-2"}/>

      <Form onSubmit={handleSubmit((data) => submit(data))}>
        <Form.Group controlId="datePicker" className={"form-group"}>
          <FormLabel className={"label"}>Input your preferred date</FormLabel>
          <Input
            type="date"
            slotProps={{
              input: {
                min: new Date().toISOString().split('T')[0],
                max: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 7).toISOString().split('T')[0]
              }
            }}
            defaultValue={new Date().toISOString().split('T')[0]}
            onChange={(e) => setValue('dateWorkout', e?.target?.value)}
          />
        </Form.Group>
        <Form.Group controlId="formSelect" className={"form-group"}>
          <FormLabel className={"label"}>Input your preferred workout type</FormLabel>
          <Controller
            name="workoutType"
            control={control}
            render={(field: { onChange, onBlur, value }) => (
              <Select
                id={'workoutType'}
                onChange={(e) => {
                  setValue('workoutType', e?.target?.outerText)
                }}
                defaultValue={field.value}
              >
                {workouts.map((workout: any) => {
                  return (<Option value={workout.value}>{workout.label}</Option>)
                })}
              </Select>
            )}
          />
        </Form.Group>
        <Form.Group controlId={"formSlider"} className={"form-group"}>
          <FormLabel className={"label"}>Input your preferred time interval</FormLabel>
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
        <Input type={"submit"} style={{float: 'right'}}>Submit</Input>
      </Form>
    </Fragment>
  );
}
