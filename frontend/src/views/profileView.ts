import { apiGet } from "../api";
import { User } from "../types/Model";
import { MeResponse } from "../types/Response";
import { setUpSideBarView } from "./sideBarView";

export async function renderProfileView(): Promise<void> {
    const app: HTMLElement | null = document.getElementById('app');
    if (!app) {
        console.error('App element not found');
        return;
    }

    const res: MeResponse = await apiGet('/user');
    const user: User | undefined = res.contents;

    app.innerHTML = `
    <section id="profile-view" class="view">
        <header id="title">
            <h1 id="title-text">プロフィール編集</h1>
        </header>
        <button id="back-to-dashboard" class="back-button">
            <svg class="back-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" />
                <polyline points="13 8 9 12 13 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        </button>
        <p id="edit-title">プロフィール設定</p>
        <form id="profile-edit-form" class="form">
            <div class="form-group">
                <label for="edit-name">名前</label>
                <input type="string" name="name" id="edit-name" placeholder="山田太郎" value="${user?.name}" />
                <p id="validation-error-name"></p>
            </div>
            <button type="submit" id="submit-button">編集</button>
        </form>
    </section>
    `;

    const title: HTMLElement | null = document.getElementById('title');
    setUpSideBarView(title);


}