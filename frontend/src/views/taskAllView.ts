import { apiGet } from "../api";
import { renderChart } from "./components/renderChart";
import { setUpSideBarView } from "./sideBarView";


export async function renderTaskAllView(): Promise<void> {
    const app: HTMLElement | null = document.getElementById('app');
    if (!app) {
        console.error('App element not found');
        return;
    }

    app.innerHTML = `
    <section id="task-list-view" class="view">
        <header id="title">
            <h1 id="title-text">タスク一覧</h1>
        </header>
        <p id="chart-title">期限チャート</p>
        <canvas id="deadline-chart" width="600" height="300"></canvas>
        <p id="team-title">タスク一覧</p>
        <div id="task-cards" class="task-cards"></div> 
    </section>`;

    const title: HTMLElement | null = document.getElementById('title');
    setUpSideBarView(title);

    const taskContainer = document.getElementById('task-cards');
    const tasks = await apiGet('/task');

    const chartData: { title: string, due: string } [] = [];

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
                    ${task.due_datetime ? `<span class="task-due-datetime">期限: ~${formatDateTime(task.due_datetime) }</span>` : ''}
                </div>
                <div class="task-description">${task.description ?? ''}</div>
            `;
            taskContainer.appendChild(btn);

            

            if (task.due_datetime) {
                chartData.push({ title: task.title, due: task.due_datetime });
            }
            
        });
        await renderChart(chartData);
        console.log(chartData.length, chartData);
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
  
function formatDateTime(iso: string): string {
    const d = new Date(iso);
    return `${d.getFullYear()}/${d.getMonth() + 1}/${d.getDate()} ${d.getHours()}:${String(d.getMinutes()).padStart(2, '0')}`;
}