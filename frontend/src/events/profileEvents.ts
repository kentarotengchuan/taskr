import { delegate } from "./delegate";
import { logout } from "../services/authService";
import { apiGet, apiPost, apiPostForm, apiPutForm } from "../api";

let eventBound = false;

export function setupProfileEvents(): void {
    if (eventBound) return;
    eventBound = true;

    const app = document.getElementById('app');
    if (!app) return;

    delegate(app, '#back-to-dashboard', 'click', async (el, event) => {
        event.preventDefault();

        history.pushState({}, '', '/mypage');
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

    delegate(app, '#submit-button', 'click', async (el, event) => {
        event.preventDefault();

        const form = document.getElementById('profile-edit-form') as HTMLFormElement;
        if (!form) return;
        const formData = new FormData(form);

        const res = await apiPutForm('/user', formData);

        if (res.result === 'success') {
            console.log(res.message);
            history.pushState({}, '', '/mypage');
            window.dispatchEvent(new PopStateEvent('popstate'));
        } else {
            console.error(`エラー: ${res.message}`);
        }
    });

    delegate(app, '#edit-image', 'change', async (el, event) => {
        event.preventDefault();

        const input = el as HTMLInputElement;
        const file = input.files?.[0];
        const previewImage = document.getElementById('image-preview') as HTMLImageElement;

        if (file && previewImage) {
            const reader = new FileReader();
            reader.onload = () => {
                previewImage.src = reader.result as string;
            };
            reader.readAsDataURL(file);
        }
    });
}