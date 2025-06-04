import { apiGet } from "../api";
import { Team } from "../types/Model";
import { TaskResponse, TeamResponse } from "../types/Response";
import { setUpSideBarView } from "./sideBarView";

export async function renderTeamCreateView(): Promise<void> {
    const app: HTMLElement | null = document.getElementById('app');
    if (!app) {
        console.error('App element not found');
        return;
    }
    
    const res: TeamResponse = await apiGet('/team');
    const teams: Team[] = res.contents;

    app.innerHTML = `
        <section id="team-create-view" class="view">
            <header id="title">
                <h1 id="title-text">チーム作成</h1>
            </header>
            <button id="back-to-dashboard" class="back-button">
                <svg class="back-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" />
                    <polyline points="13 8 9 12 13 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </button>
            <form id="team-create-form" class="form">
                <div class="form-group">
                    <label for="team-name">タイトル</label>
                    <input type="text" id="team-name" name="name" required />
                </div>

                <div class="form-group">
                    <label for="team-description">説明</label>
                    <textarea id="team-description" name="description"></textarea>
                </div>

                <div class="form-group">
                    <label for="invite-input">ユーザー招待</label>
                        <input type="text" id="invite-input" placeholder="ユーザー名で検索" required />
                        <ul id="invite-suggestions" class="invite-suggestions"></ul>
                    <div id="team-pending-list" class="invite-list">
                        <p class="team-pending-title__content">招待リスト</p>
                    </div>
                </div>

                <button id="team-create-submit-button" class="submit-button">作成</button>
            </form>
        </section>
    `;
  
    const title: HTMLElement | null = document.getElementById('title');
    setUpSideBarView(title);


}