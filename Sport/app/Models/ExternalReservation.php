<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ExternalReservation extends Model
{
    use HasFactory;
protected $connection='reservation';
protected $table='users';
protected $guarded=[];
}
