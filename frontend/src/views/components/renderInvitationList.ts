import { apiGet } from '../../api';
import { Invite, User } from '../../types/Model';
import { MeResponse } from '../../types/Response';

export async function renderInvitationList(user: User): Promise<void> {
    const inviteContainer: HTMLElement | null = document.getElementById('invitation-container');

    const invitations: Invite[] | undefined = user.invitations;

    inviteContainer!.innerHTML = '';

    if(invitations) {
        invitations.forEach((invitation: Invite) => {
            const div = document.createElement('div');
            div.className = 'invite-form';

            const infoDiv = document.createElement('div');
            infoDiv.className = 'invite-form__info';

            const buttonDiv = document.createElement('div');
            buttonDiv.className = 'invite-form__buttons';

            const name = document.createElement('span');
            name.className = 'team-name';
            name.textContent = invitation.team.name;
            infoDiv.appendChild(name);

            div.appendChild(infoDiv);

            const acceptButton = document.createElement('button');
            acceptButton.className = 'accept-button';
            acceptButton.textContent = '承認';
            acceptButton.dataset.id = String(invitation.team.id);
            buttonDiv.appendChild(acceptButton);

            const rejectButton = document.createElement('button');
            rejectButton.className = 'reject-button';
            rejectButton.textContent = '拒否';
            rejectButton.dataset.id = String(invitation.team.id);
            buttonDiv.appendChild(rejectButton);

            div.appendChild(buttonDiv);

            inviteContainer?.appendChild(div);
        });
    }
}