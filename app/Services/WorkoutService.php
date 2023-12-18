<?php

namespace App\Services;

class WorkoutService
{
    public function getWorkoutsByIntervals(): array
    {
        $workouts = \DB::table('workouts')->orderBy('startingHour')->get();

        $arrangedWorkouts = array();
        foreach ($workouts as $workout) {
            $hour = $this->convertHour($workout->startingHour);
            $arrangedWorkouts[$hour][] = $workout;
        }

        return $arrangedWorkouts;
    }

    public function convertHour(string $hour): string
    {
        if (str_contains($hour, '.')) {
            return substr($hour, 0, strpos($hour, '.')) . ':30';
        }

        return $hour . ':00';
    }

    public function getWorkoutsByType(): array
    {
        $workouts = \DB::table('workouts')->orderBy('type')->get();
        $arrangedWorkouts = array();
        foreach ($workouts as $workout) {
            $arrangedWorkouts[$workout->type]['workouts'][] = $workout;
            if(!isset($arrangedWorkouts[$workout->type]['total']))
            {
                $arrangedWorkouts[$workout->type]['total'] = 0;
            }
            $arrangedWorkouts[$workout->type]['total']+=1;
        }

        return $arrangedWorkouts;
    }
}
