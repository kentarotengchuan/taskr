export function renderRegisterView(): void {
    const app: HTMLElement | null = document.getElementById('app');
    if (!app) {
        console.error('App element not found');
        return;
    }

    app.innerHTML = `
    <section id="register-view" class="view">
      <h1>会員登録</h1>
      <form id="register-form" class="form">
        <div class="form-group">
          <label for="register-name">ユーザー名</label>
          <input type="string" id="register-name" name="name" placeholder="山田太郎" />
        </div>

        <div class="form-group">
          <label for="register-email">メールアドレス</label>
          <input type="email" id="register-email" name="email" placeholder="example@example.com" />
        </div>

        <div class="form-group">
          <label for="register-password">パスワード</label>
          <input type="password" id="register-password" name="password" placeholder="パスワードを入力" />
        </div>

        <button type="submit" id="register-submit">会員登録</button>
        <button id="login-link">ログイン画面へ</button>
      </form>
    </section>`;
}