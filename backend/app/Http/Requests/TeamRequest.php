<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class TeamRequest extends FormRequest
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
            'name' => ['required', 'string', 'max:40'],
            'description' => ['nullable', 'string', 'max:255'],
        ];
    }

    public function messages(): array
    {
    return [
        'name.required' => 'チーム名は必須です',
        'name.string' => 'チーム名は文字列で入力してください',
        'name.max' => 'チーム名は40文字以内で入力してください',

        'description.string' => '説明は文字列で入力してください',
        'description.max' => '説明は255文字以内で入力してください',
    ];
    }
}
