<?php

namespace App\Jobs;

use App\Models\Statistics;
use App\Models\User;
use App\Services\StatisticsService;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class ProcessStatistics implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * Create a new job instance.
     */
    public function __construct(
        public User $user
    ){
    }

    /**
     * Execute the job.
     */
    public function handle(StatisticsService $statisticsService): void
    {
        $statisticsService->processStatistics($this->user);
    }
}
