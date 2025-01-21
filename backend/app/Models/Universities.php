<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;


/*
|   Nama perguruan tinggi, uraian singkat
|   tentang perguruan tinggi, kontak (telp, email, wa), website, alamat, akreditasi, daftar fakultas dan
|    jurusan, biaya dan waktu pelaksanaan pendaftaran
*/

class Universities extends Model
{
    public $timestamps = false;
    protected $primaryKey = "id";
    protected $fillable = [
        "id",
        "name",
        "overview",
        "tel",
        "email",
        "website",
        "address",
        "accreditation",
        "category",
        "faculty",
        "degree",
    ];

    protected function casts(): array
    {
        return [
            'id' => 'string',
        ];
    }

    public function cost()
    {
        return $this->hasOne(UniversitiesCost::class);
    }

    public function acceptance()
    {
        return $this->hasOne(Acceptance::class);
    }
}
