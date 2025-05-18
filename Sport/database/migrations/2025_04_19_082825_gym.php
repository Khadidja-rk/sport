 <?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;


return new class extends Migration
{
    /**
     * Run the migrations.
     */

    public function up(): void
    {
        Schema::create('gyms', function (Blueprint $table) {
            $table->id();
            $table->string('session_price');
            $table->string('day');
            $table->string('start_time');
             $table->string('end_time');
            $table->timestamps();
            $table->foreignId('id_coach')->constrained('coach');
            // $table->foreignId('id_sport')->constrained('sports');
        });
    }
    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('gyms');
    }
}; 
