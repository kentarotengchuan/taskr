export type User = {
    id: number;
    name: string;
    email: string;
    img_path?: string | null;
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
    due_date: string | null; // ISO日付文字列
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

