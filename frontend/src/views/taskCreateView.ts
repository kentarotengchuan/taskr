import { apiGet } from "../api";
import { Team } from "../types/Model";
import { TaskResponse, TeamResponse } from "../types/Response";
import { setUpSideBarView } from "./sideBarView";

export async function renderTaskCreateView(): Promise<void> {
    const app: HTMLElement | null = document.getElementById('app');
    if (!app) {
        console.error('App element not found');
        return;
    }
    
    const res: TeamResponse = await apiGet('/team');
    const teams: Team[] = res.contents;

    app.innerHTML = `
        <section id="task-create-view" class="view">
            <header id="title">
                <h1 id="title-text">タスク作成</h1>
            </header>
            <button id="back-to-dashboard" class="back-button">
                <svg class="back-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" />
                    <polyline points="13 8 9 12 13 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </button>
            <form id="task-create-form" class="form">
                <div class="form-group">
                    <label for="task-title">タイトル</label>
                    <input type="text" id="task-title" name="title" required />
                </div>

                <div class="form-group">
                    <label for="task-description">説明</label>
                    <textarea id="task-description" name="description"></textarea>
                </div>  

                <div class="form-group">
                    <label for="task-due">締切日時</label>
                    <input type="datetime-local" id="task-due" name="due_datetime" />
                </div>

                <div class="form-group">
                    <label for="task-team">チーム（任意）</label>
                    <select id="task-team" name="team_id">
                        <option value="">--選択してください--</option>
                    </select>
                </div>

                <button type="submit" class="submit-button">作成</button>
            </form>
        </section>
    `;
  
    const title: HTMLElement | null = document.getElementById('title');
    setUpSideBarView(title);

    const select = document.getElementById('task-team') as HTMLSelectElement;
    if (select && Array.isArray(teams)) {
        teams.forEach(team => {
            const option = document.createElement('option');
            option.value = String(team.id);
            option.textContent = team.name;
            select.appendChild(option);
        });
    }
}