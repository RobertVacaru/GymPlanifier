<?php

namespace App\Services;

use App\Models\Workout;
use Illuminate\Support\Facades\Auth;

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

    public function getSuggestion(string $workoutPreference, array $intervalSuggestion): array {
        $workouts = Workout::where([
            ['type', $workoutPreference],
        ])->orderBy('startingHour')->get();

        $workoutsDoneBasedOnInterval = [];
        for ($i = floor($intervalSuggestion[0]); $i<= ceil($intervalSuggestion[1]); $i++){
            $workoutsDoneBasedOnInterval[strval($i)] = 0;
        }

        foreach ($workouts as $workout){
            if((float)$workout->startingHour >= $intervalSuggestion[0] && (float)$workout->finishHour <= $intervalSuggestion[1]) {
                $startingHour = floor($workout->startingHour);
                $finishHour = ceil($workout->finishHour);
                //meaning that we log that he has been at every hour
                for ($i = $startingHour; $i <= $finishHour; $i++) {
                    $workoutsDoneBasedOnInterval[$i]++;
                }
            }
        }

        $minValue = array_search(min($workoutsDoneBasedOnInterval), $workoutsDoneBasedOnInterval);
        $interval = [$minValue, $minValue + 1];

        return [$interval];
    }
}
