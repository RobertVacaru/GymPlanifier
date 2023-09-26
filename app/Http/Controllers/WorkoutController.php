<?php

namespace App\Http\Controllers;

use App\Models\Workout;
use Illuminate\Http\Request;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;
use JetBrains\PhpStorm\NoReturn;

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

    #[NoReturn] public function store(string $id, Request $request): void
    {
        var_dump($request->all());die;
        return;
    }
}
