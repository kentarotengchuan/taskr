<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Team;

class TeamUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $testUser1 = User::where('id',2)->first();
        $testUser2 = User::where('id',3)->first();

        $testUser1->teams()->attach(1, [
            'role' => 'owner',
            'created_at' => now('Asia/Tokyo'),
            'updated_at' => now('Asia/Tokyo'),
        ]);
        $testUser2->teams()->attach(1, [
            'role' => 'member',
            'created_at' => now('Asia/Tokyo'),
            'updated_at' => now('Asia/Tokyo'),
        ]);

    }
}
