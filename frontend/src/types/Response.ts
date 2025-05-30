import { User, Task, Team, CommentData } from './Model';

export type ValidationErrorResponse = {
    message: string;
    errors: {
        [field: string]: string[];
    };
};

export type LoginResponse = {
    result: 'success' | 'failed';
    message: string;
};

export type RegisterResponse = {
    result: 'success' | 'failed';
    message: string;
};

export type LogoutResponse = {
    result: 'success' | 'failed';
    message: string;
};

export type ResendResponse = {
    result: 'success' | 'failed';
    message: string;
};

export type TaskResponse = {
    contents: Task[];
};

export type TeamResponse = {
    contents: Team[];
}

export type DetailResponse = {
    result: 'success' | 'failed';
    message: string;
    contents?: Task;
}

export type TaskCreateResponse = {
    result: 'success' | 'failed';
    message: string;
    contents: number;
}

export type TaskUpdateResponse = {
    result: 'success' | 'failed';
    message: string;
}

export type CommentResponse = {
    result: 'success' | 'failed';
    message: string;
    contents?: CommentData[];
}

export type MeResponse = {
    result: 'success' | 'failed';
    message: string;
    contents?: User;
}

export type AcceptResponse = {
    result: 'success' | 'failed';
    message: string;
}

export type RejectResponse = {
    result: 'success' | 'failed';
    message: string;
}

export type TeamCreateResponse = {
    result: 'success' | 'failed';
    message: string;
    contents: Team;
}
