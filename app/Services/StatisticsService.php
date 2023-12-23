<?php

namespace App\Services;

use App\Models\DailyStatistics;
use App\Models\Statistics;
use App\Models\User;
use App\Models\Workout;

class StatisticsService
{
    public function processStatistics(User $user): void
    {
        if($user->statistics){
            $statistics = $user->statistics;
        } else{
            $statistics = new Statistics();
            $statistics->owner()->associate($user);
        }

        $workouts = Workout::all()->where('owner_id', $user->id);

        $startingHours = $finishingHours = $preferredWorkouts = [];
        foreach ($workouts as $workout){
            isset($startingHours[$workout->startingHour]) ? $startingHours[$workout->startingHour]++ : $startingHours[$workout->startingHour] = 0;
            isset( $finishingHours[$workout->finishHour]) ? $finishingHours[$workout->finishHour]++ : $finishingHours[$workout->finishHour] = 0;
            isset( $preferredWorkouts[$workout->type]) ? $preferredWorkouts[$workout->type]++ : $preferredWorkouts[$workout->type] = 0;
        }

        $statistics->preferredStartingHour = array_search(max($startingHours), $startingHours);
        $statistics->preferredFinishingHour = array_search(max($finishingHours), $finishingHours);
        $statistics->preferredWorkout = array_search(max($preferredWorkouts), $preferredWorkouts);

//        $statistics->dailyStatistics()->save(new DailyStatistics());
        $statistics->save();
    }
}
