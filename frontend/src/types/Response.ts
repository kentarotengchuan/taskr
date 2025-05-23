import { Task, Team, Comment } from './Model';

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

export type TaskUpdateResponse = {
    result: 'success' | 'failed';
    message: string;
}

export type CommentResponse = {
    result: 'success' | 'failed';
    message: string;
    contents?: Comment[];
}