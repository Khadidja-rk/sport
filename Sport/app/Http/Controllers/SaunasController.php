<?php

namespace App\Http\Controllers;

use App\Models\saunas;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redis;

class SaunasController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $data = saunas::get();
       return response()->json($data);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        
        $data = $request->validate([
          'name'=>'required|string',
          'type'=>'required|string',
           'price'=>'required|integer',
          'description'=>'required|string',
          'image'=>'nullable',
          'is_available'=>'required',
          ]);

 
   
    if ($request->hasFile('image')) {
            $data['image'] = $request->file('image')->store('images', 'public');
        } else {
            $data['image'] = null;
        }
      saunas::create($data);
   
   
    
return response()->json('success adding');
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
    public function show(saunas $saunas)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
public function edit(Request $request)
{
    $editData = saunas::where('id', $request->input('id_editing'))->first();

    if (!$editData) {
        return response()->json(['error' => 'Sauna not found'], 404);
    }

    $data = $request->validate([
        'name' => 'nullable|string',
        'type' => 'nullable|string',
        'price' => 'nullable|integer',
        'description' => 'nullable|string',
        'image' => 'nullable|file|image',
        'is_available' => 'nullable|boolean',
    ]);

    if ($request->hasFile('image')) {
        $data['image'] = $request->file('image')->store('images', 'public');
    } else {
        $data['image'] = $editData->image;
    }

    $editData->update($data);

    return response()->json('success editing');
}


    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, saunas $saunas)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request)
    {
             $data = saunas::find($request->input('id'));
             $data->delete();
        return response()->json('deleting success');
    }
}
