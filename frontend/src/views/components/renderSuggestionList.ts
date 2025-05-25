import { apiGet } from '../../api';
import { User } from '../../types/Model';

export async function renderSuggestionList(keyword: string): Promise<void> {
    const suggestionList: HTMLElement | null = document.getElementById('invite-suggestions');

    if (!keyword) {
        suggestionList!.innerHTML = '';
        return;
    }

    const res = await apiGet(`/users?name=${encodeURIComponent(keyword)}`);
    suggestionList!.innerHTML = '';

    if (res.contents) {
        res.contents.forEach((user: User) => {
            const div = document.createElement('div');
            div.className = 'user-form';

            const userDiv = document.createElement('div');
            userDiv.className = 'user-info';

            const name = document.createElement('span');
            name.className = 'user-name';
            name.textContent = user.name;
            userDiv.appendChild(name);

            div.appendChild(userDiv);

            const button = document.createElement('button');
            button.className = 'invite-button';

            const teamId: number | undefined = Number(document.getElementById('invite-form')?.dataset.id);

            const notInvited: boolean | undefined = !user.invitations?.some(invitation => invitation.team_id === teamId);

            const notJoined: boolean | undefined = !user.teams?.some(team => team.id === teamId);

            if (notJoined && notInvited) {
                button.textContent = '招待する';
            } else {
                button.textContent = '招待済み';
                button.disabled = true;
                name.classList.add('strike-text');
            }

            button.dataset.id = String(user.id);

            div.appendChild(button);
            suggestionList?.appendChild(div);
        });
    }
}