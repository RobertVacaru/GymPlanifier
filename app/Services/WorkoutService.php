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
}
