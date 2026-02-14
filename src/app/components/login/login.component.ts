import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize, timeout, catchError, of } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { AuthResponse } from '../../models/auth.model';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss'
})
export class LoginComponent {
    loginForm: FormGroup;
    error = signal<string | null>(null);
    loading = signal<boolean>(false);
    showPassword = signal<boolean>(false);

    constructor(
        private fb: FormBuilder,
        private authService: AuthService,
        private router: Router
    ) {
        this.loginForm = this.fb.group({
            username: ['', [Validators.required]],
            password: ['', [Validators.required]]
        });
    }

    onSubmit() {
        if (this.loginForm.valid) {
            this.loading.set(true);
            this.error.set(null);

            const username = this.loginForm.value.username;
            console.log('--- STARTING LOGIN ATTEMPT ---', username);

            this.authService.login(this.loginForm.value).pipe(
                timeout(8000), // Slightly shorter timeout for testing
                catchError(err => {
                    console.error('Inner catchError:', err);
                    // Pass it down to subscribe error block
                    throw err;
                }),
                finalize(() => {
                    this.loading.set(false);
                    console.log('--- LOGIN FINALIZED ---');
                })
            ).subscribe({
                next: (res: AuthResponse) => {
                    console.log('Login success data:', res);
                    if (res.role === 'ACL_ADMIN') {
                        this.router.navigate(['/admin']);
                    } else {
                        this.router.navigate(['/student']);
                    }
                },
                error: (err) => {
                    this.error.set(err.error?.message || err.message || 'Login failed');
                }
            });
        }
    }
}
