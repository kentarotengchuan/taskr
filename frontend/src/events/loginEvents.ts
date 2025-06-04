import { delegate } from './delegate';
import { login } from '../services/authService';
import { LoginResponse, ValidationErrorResponse } from '../types/Response';
import { isValidationError } from '../types/guard';
import { displayValidationErrors } from '../views/components/renderValidationMessage';

let eventBound = false;

export function setupLoginEvents(): void {
    if (eventBound) return;
    eventBound = true;

    const app = document.getElementById('app');
    if (!app) return;

    delegate(app, '#login-form', 'submit', async (el, event) => {
        event.preventDefault();

        const emailInput = document.getElementById('login-email') as HTMLInputElement;
        const passwordInput = document.getElementById('login-password') as HTMLInputElement;

        const email = emailInput?.value.trim();
        const password = passwordInput?.value;

        const res: LoginResponse | ValidationErrorResponse = await login(email, password);

        if (isValidationError(res)) {
            displayValidationErrors(res.errors);
            return;
        }

        if (res.result === "success") {
            history.pushState({}, '', '/dashboard');
            window.dispatchEvent(new PopStateEvent('popstate'));
        } else {
            alert('ログイン失敗');
        }
    });

    delegate(app, '#register-link', 'click', (el, event) => {
        event.preventDefault();

        history.pushState({}, '', '/register');
        window.dispatchEvent(new PopStateEvent('popstate'));
    });

    delegate(app, '#forgot-password-link', 'click', (el, event) => {
        event.preventDefault();
        alert('パスワードリセット機能はまだ未実装です');
    });

}