import { apiGet } from './api';
import { setupLoginEvents } from './events/loginEvents';
import { renderLoginView } from './views/loginView';
import { setupRegisterEvents } from './events/registerEvents';
import { renderRegisterView } from './views/registerView';
import { setupVerifyEvents } from './events/verifyEvents';
import { renderVerifyView } from './views/verifyView';
import { setupDashboardEvents } from './events/dashboardEvents';
import { renderDashboardView } from './views/dashboardView';
import { setupTaskDetailEvents } from './events/taskDetailEvents';
import { renderTaskDetailView } from './views/taskDetailView';
import { setupTeamDetailEvents } from './events/teamDetailEvents';
import { renderTeamDetailView } from './views/teamDetailView';

type Route = {
    path: string;
    view: (params: Record<string, string>) => Promise<void>;
    event: () => void;
    title: string;
};

let currentRoutePath: string | null = null;

const routes: Route[] = [
    {
        path: '/',
        view: async () => renderLoginView(),
        event: async () =>setupLoginEvents(),
        title: 'Taskr(タスカル) - ログイン'
    },
    {
        path: '/dashboard',
        view: async () => renderDashboardView(),
        event: async () => setupDashboardEvents(),
        title: 'Taskr(タスカル) - ダッシュボード'
    },
    {
        path: '/register',
        view: async () => renderRegisterView(),
        event: async () => setupRegisterEvents(),
        title: 'Taskr(タスカル) - 会員登録'
    },
    {
        path: '/verify',
        view: async () => renderVerifyView(),
        event: async () => setupVerifyEvents(),
        title: 'Taskr(タスカル) - 認証'
    },
    {
        path: '/task/:id',
        view: async (params) => renderTaskDetailView(Number(params.id)),
        event: async () => setupTaskDetailEvents(),
        title: 'Taskr(タスカル) - タスク'
    },
    {
        path: '/team/:id',
        view: async (params) => renderTeamDetailView(Number(params.id)),
        event: async () => setupTeamDetailEvents(),
        title: 'Taskr(タスカル) - チーム'
    },
];

function matchRoute(): { route: Route; params: Record<string, string> } | null {
    const currentPath = window.location.pathname;

    for (const route of routes) {
        const paramNames: string[] = [];

        const regexPath = route.path.replace(/:([^/]+)/g, (_, key) => {
            paramNames.push(key);
            return '([^/]+)';
        });

        const regex = new RegExp(`^${regexPath}$`);
        const match = currentPath.match(regex);

        if (match) {
            const params: Record<string, string> = {};
            paramNames.forEach((key, index) => {
                params[key] = match[index + 1];
            });

            return { route, params };
        }
    }

    return null;
}

async function isAuthenticated(): Promise<boolean> {
    const res = await apiGet('/user');
    if (res.user) {
        return true;
    } else {
        return false;
    }
}

function renderNotFound(): void {
    const app = document.getElementById('app');
    if (!app) return;

    app.innerHTML = `
    <section id="not-found">
      <h1>404 - ページが見つかりません</h1>
      <a href="/">ログイン画面に戻る</a>
    </section>
  `;
}

export async function router(): Promise<void> {
    const matched = matchRoute();

    if (!matched) {
        renderNotFound();
        return
    }

    const { route, params } = matched;
    
    const protectedRoutes: string[] = ['/dashboard', '/task', '/team'];
    
    const needsAuth: boolean = protectedRoutes.some(path =>
        route.path === path || route.path.startsWith(`${path}/`)
    );

    if (needsAuth) {
        const ok = await isAuthenticated();
        if (!ok) {
            console.log('guarded');
            history.pushState({}, '', '/');
            document.title = route.title;
            await renderLoginView('認証できませんでした');
            await setupLoginEvents();
            return;
        }
    }

    document.title = route.title;

    const app: HTMLElement | null = document.getElementById('app');
    app?.classList.remove('sideBar-open');

    await route.view(params);  

    if (currentRoutePath !== route.path) {
        await route.event();
        currentRoutePath = route.path;
    }
}