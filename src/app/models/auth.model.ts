export interface AuthResponse {
    token: string;
    username: string;
    role: 'ACL_ADMIN' | 'STUDENT';
}

export interface User {
    username: string;
    role: 'ACL_ADMIN' | 'STUDENT';
}

export interface Batch {
    id?: number;
    name: string;
    timing: string;
    active: boolean;
}

export interface Student {
    id?: number;
    name: string;
    phone: string;
    email: string;
    batchId: number;
    username?: string;
    password?: string;
    active: boolean;
}
