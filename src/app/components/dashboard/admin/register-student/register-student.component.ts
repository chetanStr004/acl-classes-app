import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../../../../services/api.service';
import { Batch } from '../../../../models/auth.model';

@Component({
    selector: 'app-register-student',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './register-student.component.html',
    styleUrl: './register-student.component.scss'
})
export class RegisterStudentComponent implements OnInit {
    studentForm: FormGroup;
    batches = signal<Batch[]>([]);
    message = signal<{ text: string, type: 'success' | 'error' } | null>(null);
    showPassword = signal<boolean>(false);

    constructor(private fb: FormBuilder, private apiService: ApiService) {
        this.studentForm = this.fb.group({
            name: ['', [Validators.required]],
            phone: ['', [Validators.required]],
            email: ['', [Validators.required, Validators.email]],
            batchId: ['', [Validators.required]],
            username: ['', [Validators.required, Validators.minLength(4)]],
            password: ['', [Validators.required, Validators.minLength(6)]],
            active: [true]
        });
    }

    ngOnInit() {
        this.loadBatches();
    }

    loadBatches() {
        this.apiService.getAdminBatches().subscribe({
            next: (data) => this.batches.set(data),
            error: (err) => this.showFeedback('Failed to load batches', 'error')
        });
    }

    onStudentSubmit() {
        if (this.studentForm.valid) {
            this.apiService.registerStudent(this.studentForm.value).subscribe({
                next: (res) => {
                    this.showFeedback('Student registered successfully!', 'success');
                    this.studentForm.reset();
                },
                error: (err) => {
                    this.showFeedback(`Registration failed: Error (${err.status}) ${err.error?.message || 'Username/Email might exist'}`, 'error');
                }
            });
        }
    }

    private showFeedback(text: string, type: 'success' | 'error') {
        this.message.set({ text, type });
        setTimeout(() => this.message.set(null), 5000);
    }
}
