<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Carbon\Carbon;
use App\Models\Task;

class TaskSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        \DB::table('tasks')->delete();
        \DB::statement("ALTER TABLE tasks AUTO_INCREMENT = 1");
        Task::updateOrCreate(['id' => 1], [
            'title' => 'test-task1',
            'description' => "It's test-task1. Created by test-user on test-team.",
            'status' => 'open',
            'due_datetime' => Carbon::today('Asia/Tokyo')->setTime(23, 59, 59),
            'user_id' => 1,
            'team_id' => 1,
        ]);
        Task::updateOrCreate(['id' => 2], [
            'title' => 'test-task2',
            'description' => "It's test-task2. Created by test-user personally.",
            'status' => 'open',
            'due_datetime' => Carbon::tomorrow('Asia/Tokyo')->setTime(10, 0, 0),
            'user_id' => 1,
        ]);
        Task::updateOrCreate(['id' => 3], [
            'title' => 'test-task3',
            'description' => "It's test-task3. Created by test-user2 on test-team.",
            'status' => 'open',
            'due_datetime' => Carbon::now('Asia/Tokyo')->addDays(2)->setTime(10, 0, 0),
            'user_id' => 2,
            'team_id' => 1,
        ]);
        Task::updateOrCreate(['id' => 4], [
            'title' => 'test-task4',
            'description' => "It's test-task4. Created by test-user2 personally.",
            'status' => 'open',
            'due_datetime' => Carbon::now('Asia/Tokyo')->addDays(3)->setTime(10, 0, 0),
            'user_id' => 2,
        ]);
    }
}
