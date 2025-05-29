import { apiGet } from '../../api';
import { Invite } from '../../types/Model';
import { MeResponse } from '../../types/Response';

export async function renderPendingList(teamId: number): Promise<void> {
    const pendingList: HTMLElement | null = document.getElementById('team-pending-list');

    pendingList!.innerHTML = '';

    const invitationRes = await apiGet(`/team/${teamId}/invitations`);
    
    invitationRes.contents.forEach((invitation: any) => {
        if (invitation.status === 'pending') {
            const li = document.createElement('li');
            li.textContent = invitation.invited_user.name;
            pendingList?.appendChild(li);
        }
    });
}