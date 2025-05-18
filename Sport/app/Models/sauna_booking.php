<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class sauna_booking extends Model
{
    use HasFactory;
 protected $table = 'sauna_bookings';
protected $guarded=[];
function reserver(){
return $this->belongsTo(ExternalReservation::class,'reserver_id','id');
}
function sauna(){
return $this->belongsTo(saunas::class,'sauna_id');
}
function timing(){
return $this->belongsTo(Sauna_Time::class,'time_id')->with('week');
}

}
