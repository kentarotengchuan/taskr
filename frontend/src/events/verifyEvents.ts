import { logout, resendEmail } from '../services/authService';
import { delegate } from './delegate';

let eventBound = false;

export function setupVerifyEvents(): void {
    if (eventBound) return;
    eventBound = true;

    const app = document.getElementById('app');
    if (!app) return;

    delegate(app, '#resend-button', 'click', async (el, event) => {
        event.preventDefault();
        await resendEmail();
    });

    delegate(app, '#logout-button', 'click', async (el, event) => {
        event.preventDefault();
        await logout();
        history.pushState({}, '', '/');
        window.dispatchEvent(new PopStateEvent('popstate'));
    });

}