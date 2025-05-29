import { delegate } from "./delegate";
import { logout } from "../services/authService";
import { apiGet, apiPost } from "../api";
import { renderTeamDetailView } from "../views/teamDetailView";
import { Invite, User } from "../types/Model";
import { renderSuggestionList } from "../views/components/renderSuggestionList";
import { renderPendingList } from "../views/components/renderPendingList";
import { TeamCreateResponse } from "../types/Response";

let eventBound = false;

export function setupTeamCreateEvents(): void {
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

    delegate(app, '#invite-input', 'input', async (el, event) => {
        event.preventDefault();
        if (!(el instanceof HTMLInputElement)) return;

        const keyword = el.value.trim();
        await renderSuggestionList(keyword);
    });

    delegate(app, '.invite-button', 'click', async (el, event) => {
        event.preventDefault();

        

        const list: HTMLElement | null = document.getElementById('team-pending-list');
        if (!list) {
            console.log('エラー: リストの取得に失敗しました。');
            return;
        }

        const name: string | undefined = el.dataset.name;
        if (!name) {
            console.log('エラー: ユーザー名の取得に失敗しました。');
            return;
        }

        const listElement = document.createElement('div');
        listElement.dataset.id = el.dataset.id;

        const span = document.createElement('span');
        span.className = 'user-name';
        span.textContent = name;
        listElement.appendChild(span);

        const button = document.createElement('button');
        button.className = 'delete-invite-button';
        button.textContent = '削除';
        button.dataset.id = el.dataset.id;
        listElement.appendChild(button);

        list.appendChild(listElement);
        
        const input = document.getElementById('invite-input') as HTMLInputElement;

        const keyword = input.value.trim();
        await renderSuggestionList(keyword);
    });

    delegate(app, '.delete-invite-button', 'click', async (el, event) => {
        event.preventDefault();

        const list: HTMLElement | null = document.getElementById('team-pending-list');
        if (!list) {
            console.log('エラー: リストの取得に失敗しました。');
            return;
        }

        const element: HTMLElement | null = document.querySelector(`div[data-id="${el.dataset.id}"]`);

        element?.remove();
        
        const input = document.getElementById('invite-input') as HTMLInputElement;
        const keyword = input.value.trim();

        await renderSuggestionList(keyword);
    });

    delegate(app, '#team-create-submit-button', 'click', async (el, event) => {
        event.preventDefault();

        const titleInput = document.getElementById('team-title') as HTMLInputElement;
        const descriptionInput = document.getElementById('team-description') as HTMLInputElement;

        const title = titleInput.value.trim();
        const description = descriptionInput.value.trim();

        const list: HTMLElement | null = document.getElementById('team-pending-list');
        if (!list) {
            console.log('エラー: リストの取得に失敗しました。');
            return;
        }
        const invitedIds: number[] = Array.from(list.querySelectorAll('div')).map(el => Number(el.dataset.id));

        const res: TeamCreateResponse = await apiPost('/team', {
            title: title,
            description: description,
            ids: invitedIds,
        });

        if (res.result == 'success') {
            console.log(res.message);
            history.pushState({}, '', `/team/${res.contents.id}`);
            window.dispatchEvent(new PopStateEvent('popstate'));
        } else {
            console.error(res.message);
        }
    });
}