<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Sauna_Time extends Model
{
    use HasFactory;
          protected $table = 'sauna__times';
   protected $guarded=[];

public function week(){
 return $this->belongsTo(Week::class,'id_week');
}
}
