<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Team;

class TeamSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        \DB::table('teams')->delete();
        \DB::statement("ALTER TABLE teams AUTO_INCREMENT = 1");
        Team::updateOrCreate(['id' => 1], [
            'name' => 'test-team',
            'description' => "It's test-team. Members are test-user1 and test-user2.",
            'owner_id' => 2,
        ]);
    }
}
