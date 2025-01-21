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
        Schema::create('universities', function (Blueprint $table) {
            $table->string("id", 16)->primary();
            $table->string("name", 255);
            $table->text("overview");
            $table->string("tel", 64);
            $table->string("email", 64);
            $table->string("website", 255);
            $table->text("address");
            $table->enum("accreditation", ["a", "b", "c"]);
            $table->enum("category", ["politeknik", "swasta", "negeri", "sekolah_tinggi", "institut"]);
            $table->json("faculty");
            $table->json("degree");
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('universities');
    }
};
