# taskr　※現在開発中

このアプリはチーム・個人におけるタスク管理アプリです。メールによる認証ユーザー間で現在のタスクの進行状況の共有・コミュニケーションをとることができます
<p align="center">
<img src="https://github.com/user-attachments/assets/01397451-faae-4309-89a6-65e85b484ee8">
</p>

# アプリ作成の目的
・LaravelをWebAPIとして採用し、FormRequestによるバリデーション、EloquentにおけるCRUD処理、Mailerによるメール送信処理、console.phpにおけるタスクスケジューリング、Laravel Duskにおけるテストコードの基礎確認、といった基本的なLaravelの知識確認。

・TypeScriptを採用し、型安全性を意識したコーディングを学ぶため。

・Vanilla.jsを採用し、非同期処理やイベント移譲、モジュール構成といったJavaScriptの基礎的な知識を確認するため。

・Viteを採用して、バンドラーの利点を開発の中で確認するため。

# 構築手順

## 1
プロジェクトディレクトリ内で「cp ./backend/.env.example ./backend/.env」で環境をコピー。
## 2
「cd frontend」でフロントエンドディレクトリに移動し、「npm install」を実行してViteをインストール。
## 3
「npm run build」を実行して、フロントエンドのファイル構成を最適化する。
## 4
プロジェクトディレクトリ内で「docker-compose up -d --build」を実行し、フロントエンドとバックエンドを構築。
## 5
バックエンドのシェルに入る。「docker-compose exec backend bash」
## 6
マイグレーションとシーディングを実行。「php artisan migrate:fresh --seed」
## 7
シンボリックリンクの作成。「php artisan storage:link」
## 8
ブラウザで「localhost:3000」にアクセスすることでアプリを表示。

# 使用技術
PHP 8.2.28

Laravel Framework 10.48.29

JavaScript

MySQL　8.0.32

Mailpit (v1.21.7)

Vite 6.3.3

# ポートごとの機能
localhost:3000 ・・・フロントエンド

localhost:8000 ・・・バックエンド(Laravel)

localhost:8080 ・・・phpMyAdmin（DB情報にアクセス）

localhost:8025 ・・・MailPit（ローカル環境では認証メールはここに表示される）

# 今後追加予定の実装
(済)・現在、ユーザーが所属しないチーム、タスクへの詳細ビューに対して直接URLを入力すればアクセスできる状態にある。これをRouterファイルによって制御し、秘匿性を高める。

➡APIによってユーザーの所属を判定し、エラーをフロントエンドに返すことで一括処理を実装した。

(済)・フロントエンドでのバリデーションと、LaravelのFormRequest、さらにTypeScriptでの型安全を組み合わせることで、データの正当性を強固にする。

➡FormRequestを実装する過程で、フロントエンド側のレスポンスが通常時のものとバリデーションエラー時のものに分かれるという問題に直面し、TypeScriptの型ガード関数という技術を学ぶきっかけになった。

・バックエンド側から返されるレスポンスの型をTypeScriptで独自に定義し、型安全をより強固にする。

・知識確認のため、AWSを用いてのデプロイを行う。