<?php

namespace App\Http\Controllers;

use App\Jobs\ProcessStatistics;
use App\Models\Statistics;
use App\Models\Workout;
use App\Repositories\WorkoutRepository;
use App\Services\StatisticsService;
use App\Services\WorkoutService;
use http\Params;
use Illuminate\Http\Request;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;

class WorkoutController extends Controller
{
    public function __construct(
        protected WorkoutService $workoutService,
        protected StatisticsService $statisticsService,
        protected WorkoutRepository $workoutRepository
    ){}

    public function index(): Collection
    {
        return DB::table('workouts')->get();
    }

    public function show(string $id): Collection
    {
        return Workout::whereId($id)->get();
    }

    public function owned(string $id, Request $request): LengthAwarePaginator
    {
        $page = $request->get('page');
        $workoutTypeFilter= $request->get('workoutTypeFilter');
        $statusFilter = $request->get('statusFilter');
        return $this->workoutRepository->getOwnerWorkouts($id, $page, $workoutTypeFilter, $statusFilter);
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
            $workout->type = $request->get('workoutType')['label'];
            $workout->date = $request->get('dateWorkout');
            $workout->owner_id = \Auth::user()['id'];
            $workout->description = $request->get('description');
            $workout->save();

            ProcessStatistics::dispatch(\Auth::user());

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

    public function showByDay(): array
    {
//        $workouts = Workout::all()->where('date', '>=', date('Y-m-d').' 00:00:00');
        return $this->workoutService->getWorkoutsByIntervals();
    }

    public function showByType(): array
    {
        return $this->workoutService->getWorkoutsByType();
    }

    public function showSuggestion(Request $request): array
    {
        $workoutPreference = $request->get('workoutTypeSuggestion') ?? '';
        $intervalPreference = $request->get('hourIntervalSuggestion');
        return $this->workoutService->getSuggestion($workoutPreference, $intervalPreference);
    }
}
