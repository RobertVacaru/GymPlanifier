
class WorkoutDefaults {
    dateWorkout: string = new Date().toISOString().split('T')[0];
    hourInterval: [number, number] = [10, 12];
    type: { value: number; label: string }= {value: 1, label: 'Back'};
    description: string = '';
}

export default WorkoutDefaults;
