export type User = {
    id: number;
    name: string;
    email: string;
    img_path?: string | null;
    teams?: Team[];
    ownedTeams?: Team[];
    tasks?: Task[];
    invitations?: Invite[];
};

export type Team = {
    id: number;
    name: string;
    description?: string | null;
    created_at: string;
    owner: {
        id: number;
        name: string;
    };
};

export type Task = {
    id: number;
    title: string;
    description: string | null;
    status: 'open' | 'in_progress' | 'done';
    due_datetime: string | null;
    user_id: number;
    team_id: number | null;
    created_at: string;
    updated_at: string;
    user?: User; // with(['user'])されていれば入る
    team?: Team; // with(['team'])されていれば入る
};

export type Comment = {
    id: number;
    content: string;
    user: User;
    task?: Task;
}

export type Invite = {
    id: number;
    team_id: number;
    invited_user_id: number;
    inviter_user_id: number;
    status: 'pending' | 'accepted';
    created_at: string;
    updated_at: string;
    team: Team;
}

