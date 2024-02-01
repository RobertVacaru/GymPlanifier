<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Statistics extends Model
{
    use HasFactory;
    public $timestamps = true;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'preferredWorkout',
        'preferredStartingHour',
        'preferredFinishingHour'
    ];

    public function parent(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function dailyStatistics(): HasMany
    {
        return $this->hasMany(DailyStatistics::class, 'parent_id');
    }

    public function statisticsByDay(string $day)
    {
        return $this->dailyStatistics()->where('day','=', $day)->first();
    }
}
