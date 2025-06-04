export function renderLoginView(message?: string): void {
    const app: HTMLElement | null = document.getElementById('app');
    if (!app) {
        console.error('App element not found');
        return;
    }

    app.innerHTML = `
    <section id="login-view" class="view">
      <h1>ログイン</h1>
      ${message ? `<p class="login-message">${message}</p>` : ''}
      <form id="login-form" class="form">
        <div class="form-group">
          <label for="login-email">メールアドレス</label>
          <input type="email" id="login-email" name="email" placeholder="example@example.com" />
        </div>

        <div class="form-group">
          <label for="login-password">パスワード</label>
          <input type="password" id="login-password" name="password" placeholder="パスワードを入力" />
        </div>

        <button type="submit" id="login-submit">ログイン</button>
        <button id="register-link">会員登録へ</button>
      </form>

      <p><a href="#" id="forgot-password-link">パスワードを忘れた場合</a></p>
    </section>`;
}