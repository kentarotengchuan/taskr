import { apiGet } from "../api";
import { CommentResponse, DetailResponse } from "../types/Response";
import { setUpSideBarView } from "./sideBarView";
import { Task } from "../types/Model";

export async function renderTaskDetailView(id: number): Promise<void> {
    const app: HTMLElement | null = document.getElementById('app');
    if (!app) {
        console.error('App element not found');
        return;
    }

    const result: DetailResponse = await apiGet(`/task/${id}`);

    if (!result.contents) {
        console.error(`Error:${result.message}`);
        return;
    }

    const task: Task = result.contents;

    app.innerHTML = `
    <section id="task-detail-view" class="view">
        <header id="title">
            <h1 id="title-text">${task.title}</h1>
        </header>
        <button id="back-to-dashboard" class="back-button">
            <svg class="back-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" />
                <polyline points="13 8 9 12 13 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        </button>
        <div class="task-detail-card ${task.status}">
            <p><strong>説明:</strong> ${task.description ?? '（なし）'}</p>
            <p><strong>期限:</strong> ${formatDateTime(task.due_datetime) ?? '未設定'}</p>
            <p><strong>作成者:</strong> ${task.user?.name ?? '不明'}</p>
            <p><strong>チーム:</strong> ${task.team?.name ?? '（個人タスク）'}</p>
            <p><strong>作成日時:</strong> ${formatDate(task.created_at)}</p>
            <p><strong>更新日時:</strong> ${formatDate(task.updated_at)}</p>

            <div class="task-status-section">
                <span class="status-badge ${task.status}">
                    ${renderStatusLabel(task.status)}
                </span>
                <label for="task-status-select">ステータス変更:</label>
                <select id="task-status-select" class="${task.status}">
                    <option disabled selected hidden>選択してください</option>
                    ${task.status !== 'open' ? '<option value="open">未着手</option>' : ''}
                    ${task.status !== 'in_progress' ? '<option value="in_progress">進行中</option>' : ''}
                    ${task.status !== 'done' ? '<option value="done">完了済み</option>' : ''}
                </select>
                <button id="update-status-button" data-id="${task.id}">更新</button>
            </div>
        </div>

        <div id="comment-container" class="comment-container">
            <h3>コメント</h3>
            <ul id="comment-list"></ul>
        </div>

        <form id="comment-form" class="comment-form" data-id="${task.id}">
            <input type="text" id="comment-input" placeholder="コメントを入力..." autocomplete="off" required />
            <button type="submit">送信</button>
        </form>
    </section>`;

    const title: HTMLElement | null = document.getElementById('title');
    setUpSideBarView(title);

    const commentList: HTMLElement | null = document.getElementById('comment-list');
    const commentRes: CommentResponse = await apiGet(`/task/${task.id}/comments`);
    if(commentRes.contents){
        for (const comment of commentRes.contents) {
            const li = document.createElement('li');
            li.textContent = `${comment.user.name}: ${comment.content}`;
            commentList?.appendChild(li);
        }
    }
}

function renderStatusLabel(status: Task['status']): string {
    switch (status) {
        case 'open': return '未着手';
        case 'in_progress': return '進行中';
        case 'done': return '完了済み';
        default: return status;
    }
}

function formatDate(iso: string): string {
    const d = new Date(iso);
    return `${d.getFullYear()}/${d.getMonth() + 1}/${d.getDate()}`;
}

function formatDateTime(iso: string | null): string {
    if (!iso) return '';
    const d = new Date(iso);
    return `${d.getFullYear()}/${d.getMonth() + 1}/${d.getDate()} ${d.getHours()}:${String(d.getMinutes()).padStart(2, '0')}`;
}