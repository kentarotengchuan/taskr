import { RegisterResponse, LoginResponse, ValidationErrorResponse, LogoutResponse, ResendResponse } from "../types/Response";
import { apiPost, getHeaders, getCookie, getCSRF, resetCSRFState } from "../api";
import { displayValidationErrors } from "../views/components/renderValidationMessage";


export async function login(email: string, password: string): Promise<LoginResponse | ValidationErrorResponse> {
    const token = await getCSRF(); 

    const result: LoginResponse | ValidationErrorResponse = await apiPost<LoginResponse>('/login', { email, password });
    
    if ('errors' in result) {
        return result;
    }

    if (result.result === 'failed') {
        throw new Error(`${result.message}`);
    } else {
        console.log(`${result.message}`);
    }
    
    return result;
}

export async function register(name: string, email: string, password: string): Promise<RegisterResponse | ValidationErrorResponse> {
    await getCSRF(); 

    const result: RegisterResponse | ValidationErrorResponse = await apiPost<RegisterResponse>('/register',
        { name, email, password });
    
    if ('errors' in result) {
        return result;
    }

    if (result.result === 'failed') {
        throw new Error(`${result.message}`);
    } else {
        console.log(`${result.message}`);
    }

    return result;
}

export async function logout(): Promise<LogoutResponse | ValidationErrorResponse>{
    const result: LogoutResponse | ValidationErrorResponse = await apiPost('/logout');

    if ('errors' in result) {
        const validationErrors = result.errors;
        displayValidationErrors(validationErrors);
        return result;
    }

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