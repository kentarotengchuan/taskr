import { delegate } from "./delegate";
import { logout } from "../services/authService";
import { apiPost } from "../api";
import { renderTaskDetailView } from "../views/taskDetailView";
import { TaskUpdateResponse } from "../types/Response";
import { renderTeamDetailView } from "../views/teamDetailView";

let eventBound = false;

export function setupTeamDetailEvents(): void {
    if (eventBound) return;
    eventBound = true;

    const app = document.getElementById('app');
    if (!app) return;

    delegate(app, '#back-to-dashboard', 'click', async (el, event) => {
        event.preventDefault();

        history.pushState({}, '', '/dashboard');
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

    delegate(app, '#chat-form', 'submit', async (el, event) => {
        event.preventDefault();

        const input = document.getElementById('chat-input') as HTMLInputElement;
        const body = input.value.trim();
        if (!body) return;

        const res = await apiPost(`/team/${el.dataset.id}/comments`, { content: body });
        if (res.result === 'success') {
            console.log(res.message);
            await renderTeamDetailView(Number(el.dataset.id));
        } else {
            console.error(`エラー: ${res.message}`);
        }
    });
}