(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))s(a);new MutationObserver(a=>{for(const o of a)if(o.type==="childList")for(const i of o.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&s(i)}).observe(document,{childList:!0,subtree:!0});function n(a){const o={};return a.integrity&&(o.integrity=a.integrity),a.referrerPolicy&&(o.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?o.credentials="include":a.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function s(a){if(a.ep)return;a.ep=!0;const o=n(a);fetch(a.href,o)}})();const I="http://localhost:8000/api";let f=null,h=null;async function L(){if(f)return f;if(h||(h=fetch("http://localhost:8000/sanctum/csrf-cookie",{credentials:"include"}).then(async()=>{for(let e=0;e<10;e++){const t=R("XSRF-TOKEN");if(t){f=decodeURIComponent(t);break}await new Promise(n=>setTimeout(n,50))}})),await h,!f)throw new Error("CSRFトークンの取得に失敗しました");return f}function A(){document.cookie="XSRF-TOKEN=; Max-Age=0; path=/;",document.cookie="laravel_session=; Max-Age=0; path=/;",f=null,h=null}function R(e){const t=document.cookie.match(new RegExp("(^| )"+e+"=([^;]+)"));return t?t[2]:null}function y(e=!0){const t=R("XSRF-TOKEN"),n={};return t&&(n["X-XSRF-TOKEN"]=decodeURIComponent(t)),e&&(n["Content-Type"]="application/json",n.Accept="application/json"),n["X-Requested-With"]="XMLHttpRequest",n}async function u(e){return await(await fetch(I+e,{method:"GET",headers:y(),credentials:"include"})).json()}async function g(e,t={}){return await(await fetch(I+e,{method:"POST",headers:y(),credentials:"include",body:JSON.stringify(t)})).json()}const E=new Set;function c(e,t,n,s){const a=`${t}:${n}`;E.has(a)||(e.addEventListener(n,o=>{const i=o.target,r=i==null?void 0:i.closest(t);r&&s(r,o)}),E.add(a))}async function _(e,t){await L();const n=await g("/login",{email:e,password:t});if(n.result==="failed")throw new Error(`${n.message}`);return console.log(`${n.message}`),n}async function O(e,t,n){await L();const s=await g("/register",{name:e,email:t,password:n});if("result"in s){if(s.result==="failed")throw new Error(`${s.message}`);console.log(`${s.message}`)}else throw new Error("バリデーションエラー");return s}async function w(){const e=await g("/logout");if(e.result==="failed")throw new Error(`${e.message}`);return console.log(`${e.message}`),A(),e}async function H(){const t=await(await fetch("http://localhost:8000/email/verification-notification",{method:"POST",headers:y(),credentials:"include"})).json();if(t.result==="failed")throw new Error(`${t.message}`);return console.log(`${t.message}`),t}let k=!1;function C(){if(k)return;k=!0;const e=document.getElementById("app");e&&(c(e,"#login-form","submit",async(t,n)=>{n.preventDefault();const s=document.getElementById("login-email"),a=document.getElementById("login-password"),o=s==null?void 0:s.value.trim(),i=a==null?void 0:a.value;if(!o||!i){alert("メールアドレスとパスワードを入力してください");return}await _(o,i)?(history.pushState({},"","/dashboard"),window.dispatchEvent(new PopStateEvent("popstate"))):alert("ログイン失敗。メールアドレスかパスワードが間違っています。")}),c(e,"#register-link","click",(t,n)=>{n.preventDefault(),history.pushState({},"","/register"),window.dispatchEvent(new PopStateEvent("popstate"))}),c(e,"#forgot-password-link","click",(t,n)=>{n.preventDefault(),alert("パスワードリセット機能はまだ未実装です")}))}function P(e){const t=document.getElementById("app");if(!t){console.error("App element not found");return}t.innerHTML=`
    <section id="login-view" class="view">
      <h1>ログイン</h1>
      ${e?`<p class="login-message">${e}</p>`:""}
      <form id="login-form" class="form">
        <div class="form-group">
          <label for="login-email">メールアドレス</label>
          <input type="email" id="login-email" required placeholder="example@example.com" />
        </div>

        <div class="form-group">
          <label for="login-password">パスワード</label>
          <input type="password" id="login-password" required placeholder="パスワードを入力" />
        </div>

        <button type="submit" id="login-submit">ログイン</button>
        <button id="register-link">会員登録へ</button>
      </form>

      <p><a href="#" id="forgot-password-link">パスワードを忘れた場合</a></p>
    </section>`}let $=!1;function q(){if($)return;$=!0;const e=document.getElementById("app");e&&(c(e,"#register-form","submit",async(t,n)=>{n.preventDefault();const s=document.getElementById("register-name"),a=document.getElementById("register-email"),o=document.getElementById("register-password"),i=s==null?void 0:s.value.trim(),r=a==null?void 0:a.value.trim(),l=o==null?void 0:o.value;if(!i||!r||!l){alert("名前とメールアドレスとパスワードを入力してください");return}await O(i,r,l),history.pushState({},"","/verify"),window.dispatchEvent(new PopStateEvent("popstate"))}),c(e,"#login-link","click",(t,n)=>{n.preventDefault(),history.pushState({},"","/"),window.dispatchEvent(new PopStateEvent("popstate"))}))}function V(){const e=document.getElementById("app");if(!e){console.error("App element not found");return}e.innerHTML=`
    <section id="register-view" class="view">
      <h1>会員登録</h1>
      <form id="register-form" class="form">
        <div class="form-group">
          <label for="register-name">ユーザー名</label>
          <input type="string" id="register-name" required placeholder="山田太郎" />
        </div>

        <div class="form-group">
          <label for="register-email">メールアドレス</label>
          <input type="email" id="register-email" required placeholder="example@example.com" />
        </div>

        <div class="form-group">
          <label for="register-password">パスワード</label>
          <input type="password" id="register-password" required placeholder="パスワードを入力" />
        </div>

        <button type="submit" id="register-submit">会員登録</button>
        <button id="login-link">ログイン画面へ</button>
      </form>
    </section>`}let B=!1;function j(){if(B)return;B=!0;const e=document.getElementById("app");e&&(c(e,"#resend-button","click",async(t,n)=>{n.preventDefault(),await H()}),c(e,"#logout-button","click",async(t,n)=>{n.preventDefault(),await w(),history.pushState({},"","/"),window.dispatchEvent(new PopStateEvent("popstate"))}))}function X(){const e=document.getElementById("app");if(!e){console.error("App element not found");return}e.innerHTML=`
    <section id="verify-view" class="view">
        <h1>認証</h1>
        <button id="resend-button">認証メールの再送信</button>
        <button id="logout-button">ログアウト</button>
    </section>`}let S=!1;function G(){if(S)return;S=!0;const e=document.getElementById("app");e&&(c(e,".task-detail-button","click",async(t,n)=>{n.preventDefault(),history.pushState({},"",`/task/${t.dataset.id}`),window.dispatchEvent(new PopStateEvent("popstate"))}),c(e,".team-detail-button","click",async(t,n)=>{n.preventDefault(),history.pushState({},"",`/team/${t.dataset.id}`),window.dispatchEvent(new PopStateEvent("popstate"))}),c(e,"#logout-button","click",async(t,n)=>{n.preventDefault(),await w()?(history.pushState({},"","/"),window.dispatchEvent(new PopStateEvent("popstate"))):alert("ログアウト失敗")}))}async function b(e){const t=document.getElementById("app"),n=document.createElement("button");n.id="sideBarButton",n.innerHTML=`
    <svg width="24px" height="24px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="#FFFFFF"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title></title> <g id="Complete"> <g id="sidebar-left"> <g> <rect data-name="Square" fill="none" height="18" id="Square-2" rx="2" ry="2" stroke="#FFFFFF" stroke-miterlimit="10" stroke-width="2" width="18" x="3" y="3"></rect> <line fill="none" stroke="#FFFFFF" stroke-miterlimit="10" stroke-width="2" x1="9" x2="9" y1="21" y2="3"></line> </g> </g> </g> </g></svg>
    `,n.addEventListener("click",()=>{s.classList.toggle("visible"),t==null||t.classList.toggle("sideBar-open")});const s=document.createElement("aside");s.id="sideBar",s.innerHTML=`
    <ul>
        <li><a href="/dashboard">🏠 ダッシュボード</a></li>
        <li><a href="/tasks">✅ タスク一覧</a></li>
        <li><a href="/teams">👥 チーム一覧</a></li>
        <li><a href="/profile">👤 プロフィール</a></li>
        <li><button id="logout-button">🚪 ログアウト</button></li>
    </ul>
    `,t==null||t.appendChild(s),e==null||e.prepend(n)}async function K(){const e=document.getElementById("app");if(!e){console.error("App element not found");return}e.innerHTML=`
    <section id="dashboard-view" class="view">
      <header id="title">
        <h1 id="title-text">ダッシュボード</h1>
      </header>
      <p id="task-title">タスク一覧</p>
      <div id="task-container"></div>
      <p id="team-title">チーム一覧</p>
      <div id="team-container"></div>
    </section>`;const t=document.getElementById("title");b(t);const n=document.getElementById("task-container"),s=await u("/task");n&&Array.from(s.contents).forEach(async i=>{const r=document.createElement("button");r.className="task-detail-button",r.dataset.id=String(i.id),r.dataset.name=i.title;const l=i.status,p=U(i.status);i.team?r.classList.add("green"):r.classList.add("red"),r.innerHTML=`
      <div class="task-title">${i.title}</div>
      <div class="task-meta">
        <span class="task-status ${l}">${p}</span>
        ${i.due_date?`<span class="task-due-date">期限: ~${i.due_date}</span>`:""}
      </div>
      <div class="task-description">${i.description??""}</div>
      `,n.appendChild(r)});const a=document.getElementById("team-container"),o=await u("/team");a&&Array.from(o.contents).forEach(async i=>{const r=document.createElement("button");r.className="team-detail-button",r.dataset.id=String(i.id),r.dataset.name=i.name,r.innerHTML=`
      <div class="team-header">
        <h2 class="team-name">${i.name}</h2>
        <span class="team-id">#${i.id}</span>
      </div>
      <div class="team-meta">
        <span class="team-owner">👑 ${i.owner.name}</span>
        <span class="team-created">📅 ${W(i.created_at)}~</span>
      </div>
      <p class="team-description">${i.description??"（説明なし）"}</p>
      `,a.appendChild(r)})}function U(e){switch(e){case"open":return"未着手";case"in_progress":return"進行中";case"done":return"完了済み";default:return e}}function W(e){const t=new Date(e);return`${t.getFullYear()}/${t.getMonth()+1}/${t.getDate()}`}async function v(e){var r,l;const t=document.getElementById("app");if(!t){console.error("App element not found");return}const n=await u(`/task/${e}`);if(!n.contents){console.error(`Error:${n.message}`);return}const s=n.contents;t.innerHTML=`
    <section id="task-detail-view" class="view">
        <header id="title">
            <h1 id="title-text">${s.title}</h1>
        </header>
        <button id="back-to-dashboard" class="back-button">
            <svg class="back-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" />
                <polyline points="13 8 9 12 13 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        </button>
        <div class="task-detail-card ${s.status}">
            <p><strong>説明:</strong> ${s.description??"（なし）"}</p>
            <p><strong>期限:</strong> ${s.due_date??"未設定"}</p>
            <p><strong>作成者:</strong> ${((r=s.user)==null?void 0:r.name)??"不明"}</p>
            <p><strong>チーム:</strong> ${((l=s.team)==null?void 0:l.name)??"（個人タスク）"}</p>
            <p><strong>作成日時:</strong> ${x(s.created_at)}</p>
            <p><strong>更新日時:</strong> ${x(s.updated_at)}</p>

            <div class="task-status-section">
                <span class="status-badge ${s.status}">
                    ${Y(s.status)}
                </span>
                <label for="task-status-select">ステータス変更:</label>
                <select id="task-status-select">
                    <option disabled selected hidden>選択してください</option>
                    ${s.status!=="open"?'<option value="open">未着手</option>':""}
                    ${s.status!=="in_progress"?'<option value="in_progress">進行中</option>':""}
                    ${s.status!=="done"?'<option value="done">完了済み</option>':""}
                </select>
                <button id="update-status-button" data-id="${s.id}">更新</button>
            </div>
        </div>

        <div id="comment-container" class="comment-container">
            <h3>コメント</h3>
            <ul id="comment-list"></ul>
        </div>

        <form id="comment-form" class="comment-form" data-id="${s.id}">
            <input type="text" id="comment-input" placeholder="コメントを入力..." autocomplete="off" required />
            <button type="submit">送信</button>
        </form>
    </section>`;const a=document.getElementById("title");b(a);const o=document.getElementById("comment-list"),i=await u(`/task/${s.id}/comments`);if(i.contents)for(const p of i.contents){const d=document.createElement("li");d.textContent=`${p.user.name}: ${p.content}`,o==null||o.appendChild(d)}}function Y(e){switch(e){case"open":return"未着手";case"in_progress":return"進行中";case"done":return"完了済み";default:return e}}function x(e){const t=new Date(e);return`${t.getFullYear()}/${t.getMonth()+1}/${t.getDate()}`}let D=!1;function J(){if(D)return;D=!0;const e=document.getElementById("app");e&&(c(e,"#back-to-dashboard","click",async(t,n)=>{n.preventDefault(),history.pushState({},"","/dashboard"),window.dispatchEvent(new PopStateEvent("popstate"))}),c(e,"#logout-button","click",async(t,n)=>{n.preventDefault(),await w()?(history.pushState({},"","/"),window.dispatchEvent(new PopStateEvent("popstate"))):alert("ログアウト失敗")}),c(e,"#update-status-button","click",async(t,n)=>{n.preventDefault();const a=document.getElementById("task-status-select").value,o=await g(`/task/${t.dataset.id}`,{status:a});o.result==="success"?(console.log(o.message),await v(Number(t.dataset.id))):console.error(`エラー: ${o.message}`)}),c(e,"#comment-form","submit",async(t,n)=>{n.preventDefault();const a=document.getElementById("comment-input").value.trim();if(!a)return;const o=await g(`/task/${t.dataset.id}/comments`,{content:a});o.result==="success"?(console.log(o.message),await v(Number(t.dataset.id))):console.error(`エラー: ${o.message}`)}))}async function M(e){var p;const t=document.getElementById("app");if(!t){console.error("App element not found");return}const s=(await u(`/team/${e}`)).contents;console.log(s),t.innerHTML=`
    <section id="team-detail-view" class="view">
        <header id="title">
            <h1 id="title-text">${s.name}</h1>
        </header>
        <button id="back-to-dashboard" class="back-button">
            <svg class="back-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" />
                <polyline points="13 8 9 12 13 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        </button>

        <div class="team-detail-card">
            <p><strong>説明:</strong> ${s.description??"（なし）"}</p>
            <p><strong>オーナー:</strong> ${((p=s.owner)==null?void 0:p.name)??"不明"}</p>
            <p><strong>メンバー:</strong> ${s.users.map(d=>d.name).join(", ")}</p>
        </div>

        <div class="team-task-list">
            <h2>タスク一覧</h2>
            <div id="team-task-container"></div>
        </div>

        <div class="team-chat">
            <h2>チームチャット</h2>
            <ul id="chat-log"></ul>
            <form id="chat-form" class="chat-form" data-id="${s.id}">
                <input type="text" id="chat-input" placeholder="メッセージを入力..." required />
                <button type="submit">送信</button>
            </form>
        </div>
    </section>
    `;const a=document.getElementById("title");b(a);const o=document.getElementById("team-task-container");(await u(`/team/${e}/tasks`)).contents.forEach(d=>{const m=document.createElement("button");m.textContent=d.title,m.className="task-card",m.dataset.id=d.id,o==null||o.appendChild(m)});const r=document.getElementById("chat-log"),l=await u(`/team/${s.id}/comments`);if(l.contents)for(const d of l.contents){const m=document.createElement("li");m.textContent=`${d.user.name}: ${d.content}`,r==null||r.appendChild(m)}}let T=!1;function z(){if(T)return;T=!0;const e=document.getElementById("app");e&&(c(e,"#back-to-dashboard","click",async(t,n)=>{n.preventDefault(),history.pushState({},"","/dashboard"),window.dispatchEvent(new PopStateEvent("popstate"))}),c(e,"#logout-button","click",async(t,n)=>{n.preventDefault(),await w()?(history.pushState({},"","/"),window.dispatchEvent(new PopStateEvent("popstate"))):alert("ログアウト失敗")}),c(e,"#chat-form","submit",async(t,n)=>{n.preventDefault();const a=document.getElementById("chat-input").value.trim();if(!a)return;const o=await g(`/team/${t.dataset.id}/comments`,{content:a});o.result==="success"?(console.log(o.message),await M(Number(t.dataset.id))):console.error(`エラー: ${o.message}`)}))}let F=null;const Q=[{path:"/",view:async()=>P(),event:async()=>C(),title:"Taskr(タスカル) - ログイン"},{path:"/dashboard",view:async()=>K(),event:async()=>G(),title:"Taskr(タスカル) - ダッシュボード"},{path:"/register",view:async()=>V(),event:async()=>q(),title:"Taskr(タスカル) - 会員登録"},{path:"/verify",view:async()=>X(),event:async()=>j(),title:"Taskr(タスカル) - 認証"},{path:"/task/:id",view:async e=>v(Number(e.id)),event:async()=>J(),title:"Taskr(タスカル) - タスク"},{path:"/team/:id",view:async e=>M(Number(e.id)),event:async()=>z(),title:"Taskr(タスカル) - チーム"}];function Z(){const e=window.location.pathname;for(const t of Q){const n=[],s=t.path.replace(/:([^/]+)/g,(i,r)=>(n.push(r),"([^/]+)")),a=new RegExp(`^${s}$`),o=e.match(a);if(o){const i={};return n.forEach((r,l)=>{i[r]=o[l+1]}),{route:t,params:i}}}return null}async function ee(){return!!(await u("/user")).user}function te(){const e=document.getElementById("app");e&&(e.innerHTML=`
    <section id="not-found">
      <h1>404 - ページが見つかりません</h1>
      <a href="/">ログイン画面に戻る</a>
    </section>
  `)}async function N(){const e=Z();if(!e){te();return}const{route:t,params:n}=e;if(["/dashboard","/task","/team"].some(i=>t.path===i||t.path.startsWith(`${i}/`))&&!await ee()){console.log("guarded"),history.pushState({},"","/"),document.title=t.title,await P("認証できませんでした"),await C();return}document.title=t.title;const o=document.getElementById("app");o==null||o.classList.remove("sideBar-open"),await t.view(n),F!==t.path&&(await t.event(),F=t.path)}window.addEventListener("DOMContentLoaded",()=>{N()});window.addEventListener("popstate",()=>{N()});
