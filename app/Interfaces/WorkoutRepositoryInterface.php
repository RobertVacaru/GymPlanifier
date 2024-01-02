<?php

namespace App\Interfaces;

interface WorkoutRepositoryInterface
{
    public function getOwnerWorkouts($id, $page, $workoutTypeFilter = null, $statusFilter = null);
}
