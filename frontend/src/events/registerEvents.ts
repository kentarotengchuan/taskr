import { delegate } from './delegate';
import { register } from '../services/authService';
import { RegisterResponse, ValidationErrorResponse } from '../types/Response';
import { isValidationError } from '../types/guard';
import { displayValidationErrors } from '../views/components/renderValidationMessage';

let eventBound = false;

export function setupRegisterEvents(): void {
    if (eventBound) return;
    eventBound = true;

    const app = document.getElementById('app');
    if (!app) return;

    delegate(app, '#register-form', 'submit', async (el, event) => {
        event.preventDefault();

        const nameInput = document.getElementById('register-name') as HTMLInputElement;
        const emailInput = document.getElementById('register-email') as HTMLInputElement;
        const passwordInput = document.getElementById('register-password') as HTMLInputElement;

        const name = nameInput?.value.trim();
        const email = emailInput?.value.trim();
        const password = passwordInput?.value;

        const res: RegisterResponse | ValidationErrorResponse = await register(name, email, password);

        if (isValidationError(res)) {
            displayValidationErrors(res.errors);
            return;
        }

        if (res.result === "success") {
            history.pushState({}, '', '/verify');
            window.dispatchEvent(new PopStateEvent('popstate'));
        } else {
            alert('登録失敗');
        }

        
    });

    delegate(app, '#login-link', 'click', (el, event) => {
        event.preventDefault();

        history.pushState({}, '', '/');
        window.dispatchEvent(new PopStateEvent('popstate'));
    });
}