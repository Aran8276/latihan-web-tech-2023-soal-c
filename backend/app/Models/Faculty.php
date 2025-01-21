<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Faculty extends Model
{
    public $timestamps = false;
    protected $primaryKey = "id";
    protected $fillable = [
        "id",
        "faculty_name",
        "is_enabled",
    ];

    protected function casts(): array
    {
        return [
            'id' => 'string',
        ];
    }
}
