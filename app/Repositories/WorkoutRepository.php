<?php

namespace App\Repositories;

use App\Interfaces\WorkoutRepositoryInterface;
use App\Models\Workout;
use DateTime;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\Date;
use Illuminate\Support\Facades\DB;

class WorkoutRepository implements WorkoutRepositoryInterface
{
    public function getOwnerWorkouts($id, $page, $workoutTypeFilter = null, $statusFilter = null): LengthAwarePaginator
    {
        $result = Workout::where('owner_id','=', $id);
        if ($workoutTypeFilter || $statusFilter){
            if($workoutTypeFilter){
                $result = $result->where('type', $workoutTypeFilter);
            }
            if($statusFilter){
                date_default_timezone_set('Europe/Bucharest');
                $actualDate = new DateTime('now');
                $hour = $actualDate->format('H');
                $actualDate= $actualDate->format('Y-m-d');
                if($statusFilter === 'In progress'){
                    $result = $result->where([
                        ['startingHour', '<=', $hour],
                        ['finishHour', '>=', $hour],
                        ['date', $actualDate]
                    ]);
                } else if($statusFilter === 'To be done'){
                    $result = $result->where([
                        ['startingHour', '>', $hour],
                        ['date', $actualDate]
                    ]);
                    $result = $result->orWhere(
                        $workoutTypeFilter ?
                            [['type','=', $workoutTypeFilter],['owner_id','=', $id],['date', '>=', $actualDate]]
                            :
                        [['owner_id','=', $id],['date', '>', $actualDate]]
                    );
                } else if($statusFilter === 'Finished'){
                    $result = $result->where([
                        ['date', $actualDate],
                        ['finishHour', '<', $hour]
                    ]);
                    $result = $result->orWhere(
                        $workoutTypeFilter ?
                            [['type','=', $workoutTypeFilter],['owner_id','=', $id],['date', '<', $actualDate]]
                            :
                        [['owner_id','=', $id],['date', '<', $actualDate]]);
                }
            }

        }

        return $result->orderBy('date','DESC')->paginate(15, page: $page);
    }
}
