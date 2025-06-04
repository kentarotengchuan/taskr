import { delegate } from './delegate';
import { logout } from '../services/authService';
import { apiPostForm } from '../api';
import { TaskCreateResponse, ValidationErrorResponse } from '../types/Response';
import { isValidationError } from '../types/guard';
import { displayValidationErrors } from '../views/components/renderValidationMessage';

let eventBound = false;

export function setupTaskCreateEvents(): void {
    if (eventBound) return;
    eventBound = true;

    const app = document.getElementById('app');
    if (!app) return;

    delegate(app, '#back-to-dashboard', 'click', async (el, event) => {
        event.preventDefault();
        history.back();
    });

    delegate(app, '#logout-button', 'click', async (el, event) => {
        event.preventDefault();

        const success = await logout();

        if (success) {
            history.pushState({}, '', '/');
            window.dispatchEvent(new PopStateEvent('popstate'));
        } else {
            alert('ログアウト失敗');
        }
    });

    delegate(app, '.submit-button', 'click', async (el, event) => {
        event.preventDefault();

        const form = document.getElementById('task-create-form') as HTMLFormElement;
        if (!form) return;
        const formData = new FormData(form);

        const res: TaskCreateResponse | ValidationErrorResponse = await apiPostForm<TaskCreateResponse>('/task', formData);

        if (isValidationError(res)) {
            displayValidationErrors(res.errors);
            return;
        }

        if (res.result === 'success') {
            console.log(res.message);
            history.pushState({}, '', `/task/${res.contents}`);
            window.dispatchEvent(new PopStateEvent('popstate'));
        } else {
            console.error(`エラー: ${res.message}`);
        }
    });
}