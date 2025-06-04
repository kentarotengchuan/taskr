import { delegate } from "./delegate";
import { logout } from "../services/authService";
import { apiGet, apiPost } from "../api";
import { renderTeamDetailView } from "../views/teamDetailView";
import { CommentData, Invite, User } from "../types/Model";
import { renderSuggestionList } from "../views/components/renderSuggestionList";
import { renderPendingList } from "../views/components/renderPendingList";
import { CommentResponse } from "../types/Response";
import { renderCommentList } from "../views/components/renderCommentList";

let eventBound = false;

export function setupTeamDetailEvents(): void {
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

    delegate(app, '#invite-input', 'input', async (el, event) => {
        event.preventDefault();
        if (!(el instanceof HTMLInputElement)) return;

        const keyword = el.value.trim();
        await renderSuggestionList(keyword);
    });

    delegate(app, '.invite-button', 'click', async (el, event) => {
        event.preventDefault();

        const teamId: number | undefined = Number(document.getElementById('invite-form')?.dataset.id);


        const res = await apiPost(`/team/${teamId}/invitations`, {
            userId: el.dataset.id,
        });

        if (res.result === 'success') {
            console.log(res.message);
            const input = document.getElementById('invite-input') as HTMLInputElement;
            const keyword = input.value.trim();

            await renderSuggestionList(keyword);
            await renderPendingList(teamId);
        } else {
            console.error(`エラー: ${res.message}`);
        }
    });

    delegate(app, '#chat-form', 'submit', async (el, event) => {
        event.preventDefault();

        const input = document.getElementById('chat-input') as HTMLInputElement;
        const body = input.value.trim();
        if (!body) return;

        const res = await apiPost(`/team/${el.dataset.id}/comments`, {
            content: body
        });

        if (res.result === 'success') {
            console.log(res.message);

            await renderTeamDetailView(Number(el.dataset.id));
        } else {
            console.error(`エラー: ${res.message}`);
        }
    });

    delegate(app, '.task-card', 'click', async (el, event) => {
        event.preventDefault();

        history.pushState({}, '', `/task/${el.dataset.id}`);
        window.dispatchEvent(new PopStateEvent('popstate'));
    });
}