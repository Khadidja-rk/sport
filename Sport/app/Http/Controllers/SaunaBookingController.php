<?php

namespace App\Http\Controllers;

use App\Models\saunas;
use App\Mail\SaunaMail;
use App\Models\ExternalReservation;
use App\Models\sauna_booking;
use App\Models\Sauna_Time;
use App\Models\Week;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class SaunaBookingController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $data = sauna_booking::with('sauna')->with('reserver')->with('timing')->get();
        return response()->json($data);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {

$data= $request->validate([
'time_id'=>'required',
'status'=>'required',
'sauna_id'=>'required'

]);
$reserver = ExternalReservation::where('name', $request->input('reserver'))->first();

if ($reserver) {
$data['reserver_id']= $reserver->id ;
$data['active']= 0 ;
 sauna_booking::create($data);


    return response()->json('success');
} else {
    return response()->json('error no booking');
}

    }

    /**
     * Store a newly created resource in storage.
     */
    public function appReserve(Request $request)
    {
        
                $data= $request->validate([
                'time_id'=>'required',
                'status'=>'required',
                'sauna_id'=>'required',
                'reserver_id'=>'required'
                ]);
                $data['active']= 0 ;
                sauna_booking::create($data);
                Sauna_Time::where('id',$data['time_id'])->update(['status'=>true]);
             return response()->json('success');

    }

    /**
     * Display the specified resource.
     */
    public function show()
    {
        $data =  Sauna_Time::where('status',0)->with('week')->get();
       $week = Week::get();
        return response()->json(['data'=>$data , 'week'=>$week]);

    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Request $request)
    {

$data= $request->validate([
'time_id'=>'nullable',
'status'=>'nullable',
'sauna_id'=>'nullable',

]);
    $reserver = ExternalReservation::where('name', $request->input('reserver'))->first();

if ($reserver) {
  $data['reserver_id'] = $reserver->id; 
}


    //
     if ($request->input('id_editing')) {
     $editR = sauna_booking::where('id',$request->input('id_editing'))->first();
     $editR->update($data);
    return response()->json('success');
} else {
    return response()->json('error no editing');
}

    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request)
    {
        $active = sauna_booking::find($request->input('id'));
        $timeStatus = Sauna_Time::where('id', $active->time_id)->first();
       if ($active->active == 1) {
         $active->update(['status'=>0 , 'active'=>0]);
        $timeStatus->update(['status'=>0]);
       }else{
          $active->update(['status'=>1 , 'active'=>1]);
         $timeStatus->update(['status'=>1]);
         $reserver = ExternalReservation::find($active['reserver_id']);
   $sauna = saunas::find($active['sauna_id']);
   $timing = Sauna_Time::find($active['time_id']); 

if ($reserver && $reserver->email) {
 if ($timing) {
    $data = [
        'reserver_name' => $reserver->name,
        'reserver_email' => $reserver->email,
        'sauna_name' => $sauna->name ?? 'N/A',
        'start_time' => $timing->start_time,
        'end_time' => $timing->end_time,
        'day' => $timing->week->day ?? 'N/A',
    ];
    Mail::to($reserver->email)->send(new SaunaMail($data));
}

  }

       return response()->json('activate success ');
       }
    }
    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request)
    {
        $data = sauna_booking::find($request->input('id'));
      $data->delete();
          
        $timeStatus = Sauna_Time::where('id', $data->time_id)->first();
          $data->update(['status'=>0 , 'active'=>0]);
        $timeStatus->update(['status'=>0]);
        return response()->json('deleting success');
    }
}
