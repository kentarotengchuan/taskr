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
            'name' => 'admin',
            'email' => 'administrstor@test.com',
            'email_verified_at' => now('Asia/Tokyo'),
            'password' => bcrypt('hogehoge'),
        ]);

        User::updateOrCreate(['id' => 2], [
            'name' => 'test-user',
            'email' => 'test@test.com',
            'email_verified_at' => now('Asia/Tokyo'),
            'password' => bcrypt('hogehoge'),
        ]);

        User::updateOrCreate(['id' => 3], [
            'name' => 'test-user2',
            'email' => 'test2@test.com',
            'email_verified_at' => now('Asia/Tokyo'),
            'password' => bcrypt('hogehoge'),
        ]);

        User::updateOrCreate(['id' => 4], [
            'name' => 'test-user3',
            'email' => 'test3@test.com',
            'email_verified_at' => now('Asia/Tokyo'),
            'password' => bcrypt('hogehoge'),
        ]);

        User::updateOrCreate(['id' => 5], [
            'name' => 'test-user4',
            'email' => 'test4@test.com',
            'email_verified_at' => now('Asia/Tokyo'),
            'password' => bcrypt('hogehoge'),
        ]);
    }
}
