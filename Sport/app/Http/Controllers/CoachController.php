<?php

namespace App\Http\Controllers;

use App\Models\Coach;
use Illuminate\Http\Request;

class CoachController extends Controller
{
     public function create(Request $request)
    {

        $data = $request->validate([
          'name'=>'required|string',
          'phone'=>'required|string',
          'salary'=>'required',
          ]);
       Coach::create($data);
      return response()->json('successfullyyyyy');


    }
     public function destroy( Request $request)
    {
         $id= $request->input('id');
        $coach = Coach::find($id);
        if (!$coach) {
               return response()->json($request);
        }
        $coach->delete();
       return response()->json('delete successfully');
    }
public function update(Request $request){

      $data = $request->validate([
          'name'=>'nullable|string',
          'phone'=>'nullable|string',
          'salary'=>'nullable',
          ]);
       $editData= Coach::find($request->input('id'));
       $editData->update($data);
      return response()->json('successfullyyyyy editiiiing');



}
}
