import {Divider, Modal, ModalClose, ModalDialog, Typography} from "@mui/joy";
import AddWorkoutForm from "../../forms/AddWorkoutForm.tsx";

interface Workout {
    workoutModal: boolean,
    setWorkoutModal: Function,
    workoutId?: number|null,
    hourInterval?: string|null,
    workoutType?: string|null
    refreshData?: Function
}

export default function addWorkoutPopUp(props: Workout) {

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
                sx={{width: '35rem', overflow: 'auto'}}
            >
                <ModalClose/>
                <Typography id="variant-modal-title" level="h2" textColor="inherit" textAlign={'center'}>
                  Input your preferred workout for the day
                </Typography>
                <Divider className={"mb-2"}/>
                <AddWorkoutForm
                  setWorkoutModal={props.setWorkoutModal}
                  workoutModal={props.workoutModal}
                  workoutId={props.workoutId}
                  hourInterval={props.hourInterval}
                  workoutType={props.workoutType}
                  refreshData={props.refreshData}
                />
            </ModalDialog>
        </Modal>)
}
