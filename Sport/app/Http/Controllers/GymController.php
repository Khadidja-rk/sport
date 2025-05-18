<?php

namespace App\Http\Controllers;

use App\Models\Coach;
use App\Models\Gym;
use Illuminate\Http\Request;

class GymController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $data = Gym::with('coach')->get();
        $coaches = Coach::get();
        $days = Gym::select('day')->distinct()->get();
        return response()->json(['coaches'=>$coaches,'data'=>$data,'days'=>$days]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
    
        $data = $request->validate([
          'id_coach'=>'required',
          'start_time'=>'required',
          'end_time'=>'required',
          'session_price'=>'required',
          'day'=>'required',
          ]);
     $start = Gym::where('start_time',$data['start_time'])
             ->where('day',$data['day'])->get();
     $end =  Gym::where('end_time',$data['end_time'])->where('day',$data['day'])->get();
       
    if ($start->count() >0 || $end->count() > 0) {
       return response()->json('erroooooooooor');
    }else{
      Gym::create($data);
      return response()->json('successfullyyyyy');
    }


   
 
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Gym $gym)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
 public function edit(Request $request)
{
    $data = $request->validate([
        'id' => 'required|exists:gyms,id',
        'id_coach' => 'nullable',
        'start_time' => 'nullable',
        'end_time' => 'nullable',
        'session_price' => 'nullable',
        'day' => 'nullable',
    ]);

    $editData = Gym::find($request->input('id'));

    if (!$editData) {
        return response()->json(['error' => 'Program not found'], 404);
    }

    $editData->update($data);
    return response()->json('Successfully edited');
}


    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Gym $gym)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request)
    {
   $data = Gym::find($request->input('id'));
  $data->delete();
return response()->json('goood deleting');
        
    }
}
