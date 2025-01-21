<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Acceptance extends Model
{
    public $timestamps = false;
    protected $primaryKey = "id";
    protected $fillable = [
        "id",
        "user_id",
        "universities_id",
        "status",
    ];


    protected function casts(): array
    {
        return [
            'id' => 'string',
        ];
    }

    public function universities()
    {
        return $this->hasOne(Universities::class, 'id', 'universities_id');
    }

    public function user()
    {
        return $this->hasOne(User::class, 'id', 'user_id');
    }
}
