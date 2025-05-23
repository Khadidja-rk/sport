<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Gym extends Model
{
    use HasFactory;
    protected $table='gyms';
    protected $guarded=[];

public function coach(){
return $this->belongsTo(Coach::class, 'id_coach');
}
}
