<?php

namespace App\Http\Controllers;

use App\Models\Workout;
use Illuminate\Http\Request;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;

class WorkoutController extends Controller
{
    public function index(): Collection
    {
        return DB::table('workouts')->get();
    }

    public function show(string $id): Collection
    {
        return DB::table('workouts')->find($id)->get();
    }

    public function owned(string $id): Collection
    {
        return DB::table('workouts')->where('owner_id', $id)->get();

    }

    public function showName(string $id): string
    {
        return  Workout::all()->find(1)->description;
    }

    public function store(string $id, Request $request): \Illuminate\Http\JsonResponse
    {
        try{
            $this->validate($request, [
                'dateWorkout' => 'required|date|after_or_equal:today',
                'workoutType' => 'required|max:100',
                'hourInterval' => 'required|array',
                'description' => 'max:200',
            ]);

            $workout = new Workout;

            $workout->startingHour = $request->get('hourInterval')[0];
            $workout->finishHour = $request->get('hourInterval')[1];
            $workout->type = $request->get('workoutType');
            $workout->date = $request->get('dateWorkout');
            $workout->owner_id = \Auth::user()['id'];
            $workout->description = $request->get('description');
            $workout->save();

            return response()->json([
                'status' => 'success',
                'msg'    => 'Okay',
            ], 201);

        }catch (ValidationException $exception){
            return response()->json([
                'status' => 'error',
                'msg'    => 'Error',
                'errors' => $exception->errors(),
            ], 422);
        }

    }
}
