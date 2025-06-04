<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class TaskRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'title' => ['required', 'string', 'max:40'],
            'description' => ['nullable', 'string','max:255'],
            'due_datetime' => ['required', 'date', 'after_or_equal:today'],
            'team_id' => ['nullable', 'exists:teams,id'],
        ];
    }

    public function messages(): array
    {
        return [
        'title.required' => 'タイトルは必須です',
        'title.string' => 'タイトルは文字列で入力してください',
        'title.max' => 'タイトルは40文字以内で入力してください',

        'description.string' => '説明は文字列で入力してください',
        'description.max' => '説明は255文字以内で入力してください',

        'due_datetime.required' => '締切日時は必須です',
        'due_datetime.date' => '締切日時は日付形式で入力してください',
        'due_datetime.after_or_equal' => '締切日時は本日以降を指定してください',

        'team_id.exists' => '指定されたチームが存在しません',
    ];
    }
}
