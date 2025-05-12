import { apiGet } from "../api";
import { CommentResponse } from "../types/Response";
import { setUpSideBarView } from "./sideBarView";

export async function renderTeamDetailView(id: number): Promise<void> {
    const app: HTMLElement | null = document.getElementById('app');
    if (!app) {
        console.error('App element not found');
        return;
    }

    const teamRes = await apiGet(`/team/${id}`);
    const team = teamRes.contents;
    console.log(team);

    app.innerHTML = `
    <section id="team-detail-view" class="view">
        <header id="title">
            <h1 id="title-text">${team.name}</h1>
        </header>
        <button id="back-to-dashboard" class="back-button">
            <svg class="back-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" />
                <polyline points="13 8 9 12 13 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        </button>

        <div class="team-detail-card">
            <p><strong>説明:</strong> ${team.description ?? '（なし）'}</p>
            <p><strong>オーナー:</strong> ${team.owner?.name ?? '不明'}</p>
            <p><strong>メンバー:</strong> ${team.users.map(m => m.name).join(', ')}</p>
        </div>

        <div class="team-task-list">
            <h2>タスク一覧</h2>
            <div id="team-task-container"></div>
        </div>

        <div class="team-chat">
            <h2>チームチャット</h2>
            <ul id="chat-log"></ul>
            <form id="chat-form" class="chat-form" data-id="${team.id}">
                <input type="text" id="chat-input" placeholder="メッセージを入力..." required />
                <button type="submit">送信</button>
            </form>
        </div>
    </section>
    `;

    const title: HTMLElement | null = document.getElementById('title');
    setUpSideBarView(title);

    const taskContainer = document.getElementById('team-task-container');
    const taskRes = await apiGet(`/team/${id}/tasks`);
    taskRes.contents.forEach(task => {
        const btn = document.createElement('button');
        btn.textContent = task.title;
        btn.className = 'task-card';
        btn.dataset.id = task.id;
        taskContainer?.appendChild(btn);
    });

    const chatLog: HTMLElement | null = document.getElementById('chat-log');
    const commentRes: CommentResponse = await apiGet(`/team/${team.id}/comments`);
    if(commentRes.contents){
        for (const comment of commentRes.contents) {
            const li = document.createElement('li');
            li.textContent = `${comment.user.name}: ${comment.content}`;
            chatLog?.appendChild(li);
        }
    }
}