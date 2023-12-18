import {Modal, ModalClose, ModalDialog} from "@mui/joy";
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
                sx={{width: '35rem'}}
            >
                <ModalClose/>
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
