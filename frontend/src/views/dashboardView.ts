import { apiGet } from "../api";
import { TaskResponse, TeamResponse } from "../types/Response";
import { setUpSideBarView } from "./sideBarView";

export async function renderDashboardView(): Promise<void> {
  const app: HTMLElement | null = document.getElementById('app');
  if (!app) {
    console.error('App element not found');
    return;
  }

  app.innerHTML = `
    <section id="dashboard-view" class="view">
      <header id="title">
        <h1 id="title-text">ダッシュボード</h1>
      </header>
      <div id="task-title">
        <span>タスク一覧</span>
        <a href="/create/task" class="create-link">タスク作成</a>
      </div>
      <div id="task-container"></div>
      <div id="team-title">
        <span>チーム一覧</span>
        <a href="/create/team" class="create-link">チーム作成</a>
      </div>
      <div id="team-container"></div>
    </section>`;
  
  const title: HTMLElement | null = document.getElementById('title');
  setUpSideBarView(title);
  
  const taskContainer: HTMLElement | null = document.getElementById('task-container');
  
  const tasks: TaskResponse = await apiGet('/task');
  if (taskContainer) {
    Array.from(tasks.contents).forEach(async (task: any) => {
      const btn = document.createElement('button');
      btn.className = 'task-detail-button';
      btn.dataset.id = String(task.id);
      btn.dataset.name = task.title;

      const statusClass = task.status;
      const statusLabel = getStatusLabel(task.status);

      if (!task.team) {
        btn.classList.add('red');
      } else {
        btn.classList.add('green');
      }
      
      btn.innerHTML = `
      <div class="task-title">${task.title}</div>
      <div class="task-meta">
        <span class="task-status ${statusClass}">${statusLabel}</span>
        ${task.due_datetime ? `<span class="task-due-datetime">期限: ~${formatDateTime(task.due_datetime)}</span>` : ''}
      </div>
      <div class="task-description">${task.description ?? ''}</div>
      `;
      taskContainer.appendChild(btn);
    });
  }

  const teamContainer: HTMLElement | null = document.getElementById('team-container');

  const teams: TeamResponse = await apiGet('/team');
  if (teamContainer) {
    Array.from(teams.contents).forEach(async team => {
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

function getStatusLabel(status: string): string {
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

function formatDateTime(iso: string): string {
  const d = new Date(iso);
  return `${d.getFullYear()}/${d.getMonth() + 1}/${d.getDate()} ${d.getHours()}:${String(d.getMinutes()).padStart(2, '0')}`;
}