import {Divider, FormLabel, Input, Modal, ModalClose, ModalDialog, Option, Select, Slider, Typography} from "@mui/joy";
import {Form} from "react-bootstrap";
import {Controller, useForm} from 'react-hook-form';
import {useState} from "react";
import useAuthContext from "../../contexts/AuthContext.tsx";
import UserInterface from "../../Interfaces/UserInterface.tsx";
import axios from "../../api/axios.ts";
import WorkoutDefaults from "../helpers/WorkoutDefaults.tsx"

interface Workout {
    workoutModal: boolean,
    setWorkoutModal: Function
}

export default function addWorkoutPopUp(props: Workout) {
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

    const userContext  = useAuthContext();
    // @ts-ignore
    const  user :UserInterface = userContext?.user;

    const valueText = (value: number) => {
        return `${Math.floor(value)}:${((value - Math.floor(value)) * 60) !== 0 ? (value - Math.floor(value)) * 60 : '00'}`
    }

    const workouts = [{value: 1, label: 'Back'}, {value: 2, label: 'Chest'}];
    const [marks, setMarks] = useState([{value: 10, label: valueText(10)}, {value: 12, label: valueText(12)}]);

    const setValuesForMarks = (values: []) => {
        // you will always have two
        let newMarks = values.map((value: number) => {
            return {value: value, label: valueText(value)}
        })
        setMarks(newMarks)
        setValue('hourInterval', newMarks)
    }

    const submit = async (data: any) => {
        try {
            console.log(user)
            await axios.post(`/workouts/${user.id}/add`, data).then(() => {
            });
        } catch (e: any) {
            if (e.response && e.response.status === 422) {
                // @ts-ignore
                setError(e.response.data.errors);
            }
        }
    }

    return (
        <Modal
            aria-labelledby="close-modal-title"
            open={props.workoutModal}
            onClose={() => props.setWorkoutModal(false)}
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
                sx={{width: '35rem'}}
            >
                <ModalClose/>
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
                                    max: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()+7).toISOString().split('T')[0]
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
                            render={(field:{ onChange, onBlur, value }) => (
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
                            getAriaLabel={() => 'Workout Time interval'}
                            min={8}
                            max={22}
                            step={0.5}
                            defaultValue={[10, 12]}
                            onChange={(e) => {
                                // @ts-ignore
                                setValuesForMarks(e?.target.value)
                            }}
                            valueLabelDisplay="off"
                            marks={marks}
                        />
                    </Form.Group>
                    <Input type={"submit"} style={{float: 'right'}}>Submit</Input>
                </Form>
            </ModalDialog>
        </Modal>)
}
