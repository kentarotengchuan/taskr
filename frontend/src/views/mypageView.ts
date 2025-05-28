import { apiGet } from "../api";
import { Invite, User } from "../types/Model";
import { MeResponse } from "../types/Response";
import { renderInvitationList } from "./components/renderInvitationList";
import { renderUserImage } from "./components/renderUserImage";
import { setUpSideBarView } from "./sideBarView";

export async function renderMypageView(): Promise<void> {
    const app: HTMLElement | null = document.getElementById('app');
    if (!app) {
        console.error('App element not found');
        return;
    }

    const res: MeResponse = await apiGet('/user');
    const user: User | undefined = res.contents;
    if (!user) {
        console.error('User not found');
        return;
    }

    app.innerHTML = `
    <section id="mypage-view" class="view">
        <header id="title">
            <h1 id="title-text">マイぺージ</h1>
        </header>
        <p class="welcome-message">ようこそ、${user.name}さん。</p>
        <div id="image-container" class="image__inner"></div>
        <button class="edit-profile-button">プロフィールを編集</button>
        <p class="title">チーム招待一覧</p>
        <div id="invitation-container"></div>
    </section>
    `;
  
    const title: HTMLElement | null = document.getElementById('title');
    setUpSideBarView(title);

    await renderInvitationList(user);

    const imgContainer: HTMLElement | null = document.getElementById('image-container');

    await renderUserImage(imgContainer, user);
}