<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        \DB::table('users')->delete();
        \DB::statement("ALTER TABLE users AUTO_INCREMENT = 1");
        User::updateOrCreate(['id' => 1], [
            'name' => 'test-user',
            'email' => 'test@test.com',
            'email_verified_at' => now(),
            'password' => bcrypt('hogehoge'),
        ]);

        User::updateOrCreate(['id' => 2], [
            'name' => 'test-user2',
            'email' => 'test2@test.com',
            'email_verified_at' => now(),
            'password' => bcrypt('hogehoge'),
        ]);
    }
}
