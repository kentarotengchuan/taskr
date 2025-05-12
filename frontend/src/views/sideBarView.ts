

export async function setUpSideBarView(el: HTMLElement | null) {
    const app: HTMLElement | null = document.getElementById('app');

    const sideBarButton: HTMLElement = document.createElement('button');
    sideBarButton.id = 'sideBarButton';
    sideBarButton.innerHTML = `
    <svg width="24px" height="24px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="#FFFFFF"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title></title> <g id="Complete"> <g id="sidebar-left"> <g> <rect data-name="Square" fill="none" height="18" id="Square-2" rx="2" ry="2" stroke="#FFFFFF" stroke-miterlimit="10" stroke-width="2" width="18" x="3" y="3"></rect> <line fill="none" stroke="#FFFFFF" stroke-miterlimit="10" stroke-width="2" x1="9" x2="9" y1="21" y2="3"></line> </g> </g> </g> </g></svg>
    `;

    sideBarButton.addEventListener('click', () => {
        sideBar.classList.toggle('visible');
        app?.classList.toggle('sideBar-open');
    });

    const sideBar: HTMLElement = document.createElement('aside');

    sideBar.id = 'sideBar';
    sideBar.innerHTML = `
    <ul>
        <li><a href="/dashboard">🏠 ダッシュボード</a></li>
        <li><a href="/tasks">✅ タスク一覧</a></li>
        <li><a href="/teams">👥 チーム一覧</a></li>
        <li><a href="/profile">👤 プロフィール</a></li>
        <li><button id="logout-button">🚪 ログアウト</button></li>
    </ul>
    `;

    

    app?.appendChild(sideBar);

    el?.prepend(sideBarButton);
}