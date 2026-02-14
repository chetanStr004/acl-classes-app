import { Injectable, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthResponse, User } from '../models/auth.model';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private readonly apiUrl = `${environment.apiUrl}/auth`;

    private userSignal = signal<User | null>(this.getUserFromStorage());

    currentUser = computed(() => this.userSignal());
    isAuthenticated = computed(() => !!this.userSignal());
    isAdmin = computed(() => this.userSignal()?.role === 'ACL_ADMIN');

    constructor(private http: HttpClient, private router: Router) { }

    login(credentials: any): Observable<AuthResponse> {
        return this.http.post<AuthResponse>(`${this.apiUrl}/login`, credentials).pipe(
            tap(response => {
                this.setSession(response);
            })
        );
    }

    logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        this.userSignal.set(null);
        this.router.navigate(['/login']);
    }

    getToken(): string | null {
        return localStorage.getItem('token');
    }

    private setSession(authResponse: AuthResponse) {
        localStorage.setItem('token', authResponse.token);
        const user: User = {
            username: authResponse.username,
            role: authResponse.role
        };
        localStorage.setItem('user', JSON.stringify(user));
        this.userSignal.set(user);
    }

    private getUserFromStorage(): User | null {
        const userJson = localStorage.getItem('user');
        return userJson ? JSON.parse(userJson) : null;
    }
}
