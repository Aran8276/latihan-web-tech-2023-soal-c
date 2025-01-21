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
        Schema::create('universities_costs', function (Blueprint $table) {
            $table->string("id", 16)->primary();
            $table->string("universities_id", 16);
            $table->integer("registration_cost");
            $table->integer("time_minutes");

            $table->foreign("universities_id")->references("id")->on("universities")->onDelete('cascade')->onUpdate("cascade");
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('universities_costs');
    }
};
