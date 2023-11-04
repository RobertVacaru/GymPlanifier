export default interface WorkoutInterface{
    id?: number,
    date: string,
    type: string,
    startingHour: string,
    finishHour: string,
    description: string,
    owner_id: number,
    created_at: string
}
