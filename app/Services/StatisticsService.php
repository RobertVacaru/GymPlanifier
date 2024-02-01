<?php

namespace App\Services;

use App\Models\DailyStatistics;
use App\Models\Statistics;
use App\Models\User;
use App\Models\Workout;
use Illuminate\Support\Carbon;
use Illuminate\Support\Collection;

class StatisticsService
{
    public function processStatistics(User $user): void
    {
        if ($user->statistics) {
            $statistics = $user->statistics;
        } else {
            $statistics = new Statistics();
            $statistics->parent()->associate($user);
        }

        $workouts = Workout::all()->where('owner_id', $user->id);

        $startingHours = $finishingHours = $preferredWorkouts = [];
        foreach ($workouts as $workout) {
            isset($startingHours[$workout->startingHour]) ? $startingHours[$workout->startingHour]++ : $startingHours[$workout->startingHour] = 0;
            isset($finishingHours[$workout->finishHour]) ? $finishingHours[$workout->finishHour]++ : $finishingHours[$workout->finishHour] = 0;
            isset($preferredWorkouts[$workout->type]) ? $preferredWorkouts[$workout->type]++ : $preferredWorkouts[$workout->type] = 0;
        }

        $statistics->preferredStartingHour = array_search(max($startingHours), $startingHours);
        $statistics->preferredFinishingHour = array_search(max($finishingHours), $finishingHours);
        $statistics->preferredWorkout = array_search(max($preferredWorkouts), $preferredWorkouts);

        $statistics->save();
        $this->calculateDailyStatistics($statistics, $workouts);
    }

    public function calculateDailyStatistics(Statistics $statistics, Collection $workouts): void
    {
        $dailyArray = [];
        /**@var Workout $workout */
        foreach ($workouts as $workout) {
            $day = $workout->date;
            $day = Carbon::parse($day)->dayName;
            $dailyArray[$day][] = $workout;
        }

        foreach ($dailyArray as $day => $workoutsBasedOnDay) {
            /**@var DailyStatistics $daily */
            $daily = $statistics->statisticsByDay($day);
            if (!$daily) {
                $daily = new DailyStatistics();
                $daily->day = $day;
                $daily->parent()->associate($statistics);
            }

            $startingHours = $finishingHours = $preferredWorkouts = [];
            foreach ($workoutsBasedOnDay as $workout) {
                isset($startingHours[$workout->startingHour]) ? $startingHours[$workout->startingHour]++ : $startingHours[$workout->startingHour] = 0;
                isset($finishingHours[$workout->finishHour]) ? $finishingHours[$workout->finishHour]++ : $finishingHours[$workout->finishHour] = 0;
                isset($preferredWorkouts[$workout->type]) ? $preferredWorkouts[$workout->type]++ : $preferredWorkouts[$workout->type] = 0;
            }

            $daily->preferredStartingHour = array_search(max($startingHours), $startingHours);
            $daily->preferredFinishingHour = array_search(max($finishingHours), $finishingHours);
            $daily->preferredWorkout = array_search(max($preferredWorkouts), $preferredWorkouts);

            $daily->save();
        }
    }

    public function getStatisticsForChart(bool $allUsers): array
    {
        if ($allUsers) {
            $statistics = DailyStatistics::all();
        } else {
            if(\Auth::user()->statistics) {
                $statistics = \Auth::user()->statistics;
                $statistics = $statistics->dailyStatistics;
            } else {
                return [];
            }
        }
        $weekDays= ['', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];


        $data = [];
        foreach ($weekDays as $weekDay){
            $obj = new \stdClass();
            $obj->x = $weekDay;
            $obj->y = '';
            $data[] = $obj;
        }

        foreach ($statistics as $statistic) {
            $obj = new \stdClass();
            $obj->x = $statistic->day;
            $obj->y = $statistic->preferredWorkout;
            $index = array_column($data, 'x');
            $map = array_flip($index);
            $data[$map[$statistic->day] ?? null] = $obj;
        }

        return $data;
    }
}
