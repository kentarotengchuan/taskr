import { apiGet } from "../api";
import { Team } from "../types/Model";
import { TeamResponse } from "../types/Response";
import { setUpSideBarView } from "./sideBarView";

export async function renderTeamAllView(): Promise<void> {
    const app: HTMLElement | null = document.getElementById('app');
    if (!app) {
        console.error('App element not found');
        return;
    }

    app.innerHTML = `
    <section id="team-list-view" class="view">
        <header id="title">
            <h1 id="title-text">チーム一覧</h1>
        </header>
        <p id="team-title">チーム一覧</p>
        <div id="team-cards" class="team-cards"></div> 
    </section>`;

    const title: HTMLElement | null = document.getElementById('title');
    setUpSideBarView(title);

    const teamContainer = document.getElementById('team-cards');
    const res: TeamResponse = await apiGet('/team');
    const teams: Team[] = res.contents;


    if (teamContainer) {
        Array.from(teams).forEach(async (team: Team) => {
            const btn = document.createElement('button');
            btn.className = 'team-detail-button';
            btn.dataset.id = String(team.id);
            btn.dataset.name = team.name;

            btn.innerHTML = `
                <div class="team-header">
                    <h2 class="team-name">${team.name}</h2>
                    <span class="team-id">#${team.id}</span>
                </div>
                <div class="team-meta">
                    <span class="team-owner">👑 ${team.owner?.name ?? '不明なユーザー'}</span>
                    <span class="team-created">📅 ${formatDate(team.created_at)}~</span>
                </div>
                <p class="team-description">${team.description ?? '（説明なし）'}</p>
            `;
            teamContainer.appendChild(btn);
            
        });
    }
}

function formatDate(iso: string): string {
    const d = new Date(iso);
    return `${d.getFullYear()}/${d.getMonth() + 1}/${d.getDate()}`;
}
  
function formatDateTime(iso: string): string {
    const d = new Date(iso);
    return `${d.getFullYear()}/${d.getMonth() + 1}/${d.getDate()} ${d.getHours()}:${String(d.getMinutes()).padStart(2, '0')}`;
}