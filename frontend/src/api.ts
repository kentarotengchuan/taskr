const API_BASE = 'http://localhost:8000/api';
let csrfToken: string | null = null;
let csrfFetchPromise: Promise<void> | null = null;

export async function getCSRF(): Promise<string> {
    if (csrfToken) return csrfToken;
    if (!csrfFetchPromise) {
        csrfFetchPromise = fetch('http://localhost:8000/sanctum/csrf-cookie', {
            credentials: 'include',
        }).then(async () => {
            for (let i = 0; i < 10; i++) {
                const token = getCookie('XSRF-TOKEN');
                if (token) {
                    csrfToken = decodeURIComponent(token);
                    break;
                }
                await new Promise(res => setTimeout(res, 50));
            }
        });
    }

    await csrfFetchPromise;
    if (!csrfToken) throw new Error('CSRFトークンの取得に失敗しました');
    return csrfToken;
}

export function resetCSRFState(): void {
    document.cookie = 'XSRF-TOKEN=; Max-Age=0; path=/;';
    document.cookie = 'laravel_session=; Max-Age=0; path=/;';
    csrfToken = null;
    csrfFetchPromise = null;
}

export function getCookie(name: string) {
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    if (match) return match[2];
    return null;
}

export function deleteCookie(name: string) {
    document.cookie = `${name}=; Max-Age=0; path=/;`;
}

export function getHeaders(isJson: boolean = true) {
    const xsrf: string | null = getCookie('XSRF-TOKEN');
    const headers: {
        'Authorization'?: string;
        'Content-Type'?: string;
        'Accept'?: string;
        'X-XSRF-TOKEN'?: string;
        'X-Requested-With'?: string;
    } = {};

    if (xsrf) headers['X-XSRF-TOKEN'] = decodeURIComponent(xsrf);

    if (isJson) {
        headers['Content-Type'] = 'application/json'; 
        headers['Accept'] = 'application/json';
    } 

    headers['X-Requested-With'] = 'XMLHttpRequest';

    return headers;
}

export async function apiGet(endpoint: string): Promise<any> {
    const res = await fetch(API_BASE + endpoint, {
        method: 'GET',
        headers: getHeaders(),
        credentials: 'include',
    });
    return await res.json();
}

export async function apiPost(endpoint: string, body = {}): Promise<any> {
    const res = await fetch(API_BASE + endpoint, {
        method: 'POST',
        headers: getHeaders(),
        credentials: 'include',
        body: JSON.stringify(body),
    });
    return await res.json();
}

export async function apiPostForm(endpoint: string, formData: FormData): Promise<any> {
    const res = await fetch(API_BASE + endpoint, {
        method: 'POST',
        headers: getHeaders(false),
        credentials: 'include',
        body: formData,
    });
    return await res.json();
}

export async function apiDelete(endpoint: string): Promise<any> {
    const res = await fetch(API_BASE + endpoint, {
        method: 'DELETE',
        headers: getHeaders(),
        credentials: 'include',
    });
    return await res.json();
}

export async function apiPutForm(endpoint: string, formData: FormData): Promise<any> {
    formData.append('_method', 'PUT');

    const res = await fetch(API_BASE + endpoint, {
        method: 'POST',
        headers: getHeaders(false),
        credentials: 'include',
        body: formData,
    });
    return await res.json();
}