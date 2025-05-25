import { delegate } from './delegate';
import { logout } from '../services/authService';
import { apiDelete, apiGet, apiPost } from '../api';
import { AcceptResponse, MeResponse, RejectResponse } from '../types/Response';
import { renderInvitationList } from '../views/components/renderInvitationList';
import { User } from '../types/Model';

let eventBound = false;

export function setupMypageEvents(): void {
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

    delegate(app, '.edit-profile-button', 'click', async (el, event) => {
        event.preventDefault();

        history.pushState({}, '', '/mypage/profile');
        window.dispatchEvent(new PopStateEvent('popstate'));
    });

    delegate(app, '.accept-button', 'click', async (el, event) => {
        event.preventDefault();

        const res: AcceptResponse = await apiPost(`/team/${el.dataset.id}/users`);

        if (res.result === 'success') {
            console.log(res.message);
            const meRes: MeResponse = await apiGet('/user');
            const user: User | undefined = meRes.contents;
            if (!user) {
                console.error('エラー： ユーザー情報取得エラー');
                return;
            }

            await renderInvitationList(user);
        } else {
            console.error(`エラー: ${res.message}`);
        }
    });

    delegate(app, '.reject-button', 'click', async (el, event) => {
        event.preventDefault();

        const res: RejectResponse = await apiDelete(`/team/${el.dataset.id}/invitations`);

        if (res.result === 'success') {
            console.log(res.message);

            const meRes: MeResponse = await apiGet('/user');
            const user: User | undefined = meRes.contents;
            if (!user) {
                console.error('エラー： ユーザー情報取得エラー');
                return;
            }

            await renderInvitationList(user);
        } else {
            console.error(`エラー: ${res.message}`);
        }
    });
}