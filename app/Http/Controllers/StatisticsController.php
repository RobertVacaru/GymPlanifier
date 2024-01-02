<?php

namespace App\Http\Controllers;

use App\Services\StatisticsService;
use Illuminate\Http\Request;

class StatisticsController extends Controller {
    public function __construct(
        protected StatisticsService $statisticsService
    ){}

    public function statistics(Request $request): array
    {
        return $this->statisticsService->getStatisticsForChart($request->get('allUsers'));
    }
}
