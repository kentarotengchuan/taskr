import { delegate } from './delegate';
import { register } from '../services/authService';

let eventBound = false;

// ログイン画面用イベント登録
export function setupRegisterEvents(): void {
    if (eventBound) return;
    eventBound = true;

    const app = document.getElementById('app');
    if (!app) return;

    // フォーム送信時の処理（submitイベント）
    delegate(app, '#register-form', 'submit', async (el, event) => {
        event.preventDefault();

        const nameInput = document.getElementById('register-name') as HTMLInputElement;
        const emailInput = document.getElementById('register-email') as HTMLInputElement;
        const passwordInput = document.getElementById('register-password') as HTMLInputElement;

        const name = nameInput?.value.trim();
        const email = emailInput?.value.trim();
        const password = passwordInput?.value;

        if (!name || !email || !password) {
            alert('名前とメールアドレスとパスワードを入力してください');
            return;
        }

        const result = await register(name, email, password);

        history.pushState({}, '', '/verify');
        window.dispatchEvent(new PopStateEvent('popstate'));
    });

    delegate(app, '#login-link', 'click', (el, event) => {
        event.preventDefault();

        history.pushState({}, '', '/');
        window.dispatchEvent(new PopStateEvent('popstate'));
    });
}