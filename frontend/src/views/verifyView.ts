export function renderVerifyView(): void {
    const app: HTMLElement | null = document.getElementById('app');
    if (!app) {
        console.error('App element not found');
        return;
    }

    app.innerHTML = `
    <section id="verify-view" class="view">
        <h1>認証</h1>
        <button id="resend-button">認証メールの再送信</button>
        <button id="logout-button">ログアウト</button>
    </section>`;
}