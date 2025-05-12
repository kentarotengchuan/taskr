import { RegisterResponse, LoginResponse, ValidationErrorResponse, LogoutResponse, ResendResponse } from "../types/Response";
import { apiPost, getHeaders, getCookie, getCSRF, resetCSRFState } from "../api";


export async function login(email: string, password: string): Promise<LoginResponse> {
    const token = await getCSRF(); 

    const result: LoginResponse = await apiPost('/login', { email, password });
    
    if (result.result === 'failed') {
        throw new Error(`${result.message}`);
    } else {
        console.log(`${result.message}`);
    }
    
    return result;
}

export async function register(name: string, email: string, password: string): Promise<RegisterResponse | ValidationErrorResponse> {
    await getCSRF(); 

    const result: RegisterResponse | ValidationErrorResponse = await apiPost('/register',
        { name, email, password });
    
    if ('result' in result) {
        if (result.result === 'failed') {
            throw new Error(`${result.message}`);
        } else {
            console.log(`${result.message}`);
        }
    } else {
        throw new Error('バリデーションエラー');
    }

    return result;
}

export async function logout(): Promise<LogoutResponse>{
    const result: LogoutResponse = await apiPost('/logout');

    if (result.result === 'failed') {
        throw new Error(`${result.message}`);
    } else {
        console.log(`${result.message}`);
    }

    resetCSRFState();

    return result;
}

export async function resendEmail(): Promise<ResendResponse> {
    const response: Response = await fetch('http://localhost:8000/email/verification-notification', {
        method: 'POST',
        headers: getHeaders(),
        credentials: 'include',
    });

    const result: ResendResponse = await response.json();

    if (result.result === 'failed') {
        throw new Error(`${result.message}`);
    } else {
        console.log(`${result.message}`);
    }

    return result;
}