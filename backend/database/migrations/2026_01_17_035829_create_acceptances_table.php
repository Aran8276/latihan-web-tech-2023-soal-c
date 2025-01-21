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
        Schema::create('acceptances', function (Blueprint $table) {
            $table->string("id", 16)->primary();
            $table->unsignedBigInteger("user_id");
            $table->string("universities_id", 16);
            $table->enum("status", ["pending", "accepted", "declined"]);

            $table->foreign("user_id")->references("id")->on("users")->onDelete('cascade')->onUpdate("cascade");
            $table->foreign("universities_id")->references("id")->on("universities")->onDelete('cascade')->onUpdate("cascade");
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('acceptances');
    }
};
