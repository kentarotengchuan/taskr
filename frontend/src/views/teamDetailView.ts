import { apiGet } from "../api";
import { CommentData, Task, User } from "../types/Model";
import { CommentResponse } from "../types/Response";
import { renderCommentList } from "./components/renderCommentList";
import { renderPendingList } from "./components/renderPendingList";
import { setUpSideBarView } from "./sideBarView";

export async function renderTeamDetailView(id: number): Promise<void> {
    const app: HTMLElement | null = document.getElementById('app');
    if (!app) {
        console.error('App element not found');
        return;
    }

    const teamRes = await apiGet(`/team/${id}`);
    const team = teamRes.contents;

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

        <div class="main-content">
            <div class="left-panel">
                <div class="team-detail-card">
                    <h2>チーム情報</h2>
                    <p><strong>説明:</strong> ${team.description ?? '（なし）'}</p>
                    <p><strong>オーナー:</strong> ${team.owner?.name ?? '不明'}</p>
                    <p><strong>メンバー:</strong> ${team.users.map((m: User) => m.name).join(', ')}</p>
                </div>
            </div>

            <div class="right-panel">
                <div class="team-task-list">
                    <h2>タスク一覧</h2>
                    <div id="team-task-container"></div>
                </div>
            </div>
        </div>

        <div class="team-members-panel">
            <h2>参加中のメンバー</h2>
            <ul id="team-members-list"></ul>

            <h2>招待中のユーザー</h2>
            <ul id="team-pending-list"></ul>

            <h2>ユーザー招待</h2>
            <form id="invite-form" class="invite-form" data-id="${team.id}">
                <input type="text" id="invite-input" placeholder="ユーザー名で検索" required />
                <ul id="invite-suggestions" class="invite-suggestions"></ul>
            </form>
        </div>

        <div class="team-chat">
            <h2>チームチャット</h2>
            <ul id="comment-list"></ul>
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
    taskRes.contents.forEach((task: Task) => {
        const btn = document.createElement('button');
        btn.className = `task-card ${task.status}`;
        btn.dataset.id = String(task.id);

        const today = new Date();
        const dueDatetime = task.due_datetime ? new Date(task.due_datetime) : null;
        const isExpired = dueDatetime && dueDatetime < today;
        if (isExpired) {
            btn.classList.add('expired');
        }

        btn.innerHTML = `
        <h3 class="task-title">${task.title} ${isExpired && task.status !== 'done' ? '<span class="task-warning">⚠</span>' : ''}
        </h3>
        <p class="task-meta"><strong>期限:</strong> ${formatDateTime(task.due_datetime) ?? '未設定'}</p>
        <p class="task-meta"><strong>ステータス:</strong>
        <span class="status-badge ${task.status}">${renderStatusLabel(task.status)}</span>
        </p>
        `;

        taskContainer?.appendChild(btn);
    });

    const membersList = document.getElementById('team-members-list');
    team.users.forEach((user: User) => {
        const li = document.createElement('li');
        li.textContent = user.name;
        membersList?.appendChild(li);
    });

    await renderPendingList(team.id);

    const commentList: HTMLElement | null = document.getElementById('comment-list');
    const commentRes: CommentResponse = await apiGet(`/team/${team.id}/comments`);
    const comments: CommentData[] | undefined = commentRes.contents;
        
    if (comments) await renderCommentList(comments);
    if (commentList) commentList.scrollTop = commentList.scrollHeight;
}

function renderStatusLabel(status: Task['status']): string {
    switch (status) {
        case 'open': return '未着手';
        case 'in_progress': return '進行中';
        case 'done': return '完了済み';
        default: return status;
    }
}

function formatDateTime(iso: string | null): string {
    if (!iso) return '';
    const d = new Date(iso);
    return `${d.getFullYear()}/${d.getMonth() + 1}/${d.getDate()} ${d.getHours()}:${String(d.getMinutes()).padStart(2, '0')}`;
}