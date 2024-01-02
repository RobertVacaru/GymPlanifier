<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * Workout
 *
 * @mixin \Illuminate\Database\Eloquent\Builder
 */
class Workout extends Model
{
    use HasFactory;
    use SoftDeletes;
    public $timestamps = true;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'description',
        'type',
        'date',
        'startingHour',
        'finishHour'
    ];

    protected array $dates = ['deleted_at'];

    public function owner(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
