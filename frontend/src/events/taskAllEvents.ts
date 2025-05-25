import { delegate } from './delegate';
import { logout } from '../services/authService';

let eventBound = false;

export function setupTaskAllEvents(): void {
    if (eventBound) return;
    eventBound = true;

    const app = document.getElementById('app');
    if (!app) return;

    delegate(app, '.task-detail-button', 'click', async (el, event) => {
        event.preventDefault();

        history.pushState({}, '', `/task/${el.dataset.id}`);
        window.dispatchEvent(new PopStateEvent('popstate'));
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
}