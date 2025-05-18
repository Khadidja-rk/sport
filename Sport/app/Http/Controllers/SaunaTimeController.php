<?php

namespace App\Http\Controllers;

use App\Models\Sauna_Time;
use App\Models\Week;
use Illuminate\Http\Request;

class SaunaTimeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $data = Sauna_Time::with('week')->where('status',0)->get();
        $week = Week::get();
        return response()->json(['data'=>$data,'week'=>$week]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        $data = $request->validate([
             'start_time'=>'required',
             'end_time'=>'required',
             'id_week'=>'required',
             'status'=>'nullable',
         ]);
       Sauna_Time::create($data);
       return response()->json('success');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store()
    {
        $data = Sauna_Time::with('week')->where('status',0)->get();
        return response()->json($data);
    }

    /**
     * Display the specified resource.
     */
    public function show(Sauna_Time $sauna_Time)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Sauna_Time $sauna_Time)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Sauna_Time $sauna_Time)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request)
    {
        $ele= Sauna_Time::find($request->input('id'));
        $ele->delete();
        return response()->json('delete success');

    }
}
