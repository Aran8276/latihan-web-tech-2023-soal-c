<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;


/*
|   Nama perguruan tinggi, uraian singkat
|   tentang perguruan tinggi, kontak (telp, email, wa), website, alamat, akreditasi, daftar fakultas dan
|    jurusan, biaya dan waktu pelaksanaan pendaftaran
*/

class UniversitiesCost extends Model
{
    public $timestamps = false;
    protected $primaryKey = "id";
    protected $fillable = [
        "id",
        "universities_id",
        "registration_cost",
        "time_minutes",
    ];

    protected function casts(): array
    {
        return [
            'id' => 'string',
        ];
    }
}
