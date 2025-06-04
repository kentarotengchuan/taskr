import { apiGet } from '../../api';
import { CommentData, User } from '../../types/Model';
import { CommentResponse, MeResponse } from '../../types/Response';

export async function renderCommentList(comments: CommentData[]): Promise<void> {
    const commentContainer: HTMLElement | null = document.getElementById('comment-list');

    commentContainer!.innerHTML = '';

    const res: MeResponse = await apiGet('/user');
    if (res.result === 'failed') {
        console.error('エラー: ユーザー情報の取得に失敗しました。');
        return;
    }
    const user: User | undefined = res.contents;
    const authId: number | undefined = user?.id;
    

    for (const comment of comments) {
        if (comment.user.id !== 1) {
            const datetimeSpan = document.createElement('span');
            datetimeSpan.textContent = formatDateTime(comment.created_at);
            if (comment.user.id === user?.id) {
                datetimeSpan.classList.add('comment-datetime__content');
            } else {
                datetimeSpan.classList.add('comment-datetime__content--notAuthor');
            }
            commentContainer?.appendChild(datetimeSpan);

            const div = document.createElement('div');
            div.classList.add('comment__wrapper');

            const imgDiv = document.createElement('div');
            imgDiv.classList.add('image__wrapper');

            const img = document.createElement('img');
            img.classList.add('image__comment');
            img.src = `http://localhost:8000/storage/user_images/${comment.user.img_path || 'emp.png'}`;

            imgDiv.appendChild(img);

            const contentDiv = document.createElement('div');
            contentDiv.classList.add('content__wrapper');
        
            const nameSpan = document.createElement('span');
            nameSpan.classList.add('content__name');
            nameSpan.textContent = comment.user.name;

            const contentSpan = document.createElement('span');
            contentSpan.classList.add('content__comment');
            contentSpan.textContent = comment.content;

            contentDiv.appendChild(nameSpan);
            contentDiv.appendChild(contentSpan);
        
            div.appendChild(imgDiv);

            const isAuth: boolean = comment.user.id === authId;
            if (isAuth) {
                div.prepend(contentDiv);
                div.classList.add('right-side');
            } else {
                div.appendChild(contentDiv);
                div.classList.add('left-side');
            }

            commentContainer?.appendChild(div);
        } else {
            const div = document.createElement('div');
            div.classList.add('comment__wrapper');
            div.classList.add('admin');

            const contentSpan = document.createElement('span');
            contentSpan.classList.add('content__comment');
            contentSpan.classList.add('admin');
            contentSpan.textContent = comment.content;

            div.appendChild(contentSpan);

            commentContainer?.appendChild(div);
        }   
    }
}

function formatDateTime(datetimeString: string): string {
    const date = new Date(datetimeString);
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    const hh = String(date.getHours()).padStart(2, '0');
    const mi = String(date.getMinutes()).padStart(2, '0');
    return `${yyyy}/${mm}/${dd} ${hh}:${mi}`;
}