
class WorkoutDefaults {
    dateWorkout: string = new Date().toISOString().split('T')[0];
    hourInterval: [number, number] = [10, 12];
    workoutType: [{ label: string; value: number }]= [{label: 'Back', value: 1}];
}

export default WorkoutDefaults;
