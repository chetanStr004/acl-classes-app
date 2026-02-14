import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../../../../services/api.service';
import { Batch, Student } from '../../../../models/auth.model';

@Component({
    selector: 'app-batch-students',
    standalone: true,
    imports: [CommonModule, FormsModule, ReactiveFormsModule],
    templateUrl: './batch-students.component.html',
    styleUrl: './batch-students.component.scss'
})
export class BatchStudentsComponent implements OnInit {
    batches = signal<Batch[]>([]);
    students = signal<Student[]>([]);
    searchQuery = signal('');

    // Edit state
    editingStudent = signal<Student | null>(null);
    editForm: FormGroup;
    isUpdating = signal(false);

    filteredStudents = computed(() => {
        const query = this.searchQuery().toLowerCase().trim();
        if (!query) return this.students();

        return this.students().filter(s =>
            s.name.toLowerCase().includes(query) ||
            s.email.toLowerCase().includes(query) ||
            (s.username && s.username.toLowerCase().includes(query)) ||
            s.phone.includes(query)
        );
    });

    selectedBatchId: number | null = null;
    loading = signal(false);
    showPassword = signal<boolean>(false);
    error = signal<string | null>(null);

    constructor(private apiService: ApiService, private fb: FormBuilder) {
        this.editForm = this.fb.group({
            name: ['', [Validators.required]],
            phone: ['', [Validators.required]],
            email: ['', [Validators.required, Validators.email]],
            batchId: [null, [Validators.required]],
            password: [''], // Optional password update
            active: [true]
        });
    }

    ngOnInit() {
        this.loadBatches();
    }

    loadBatches() {
        this.apiService.getAdminBatches().subscribe({
            next: (data) => this.batches.set(data),
            error: (err) => this.error.set('Failed to load batches.')
        });
    }

    onBatchChange() {
        if (this.selectedBatchId !== null) {
            this.loading.set(true);
            this.error.set(null);
            this.apiService.getStudentsInBatch(this.selectedBatchId).subscribe({
                next: (data) => {
                    this.students.set(data);
                    this.loading.set(false);
                },
                error: (err) => {
                    this.error.set(`Error (${err.status}): ${err.message || 'Check server logs'}`);
                    this.loading.set(false);
                }
            });
        } else {
            this.students.set([]);
        }
    }

    openEdit(student: Student) {
        this.editingStudent.set(student);
        this.editForm.patchValue({
            name: student.name,
            phone: student.phone,
            email: student.email,
            batchId: student.batchId,
            password: '', // Keep empty unless admin wants to change it
            active: student.active
        });
    }

    closeEdit() {
        this.editingStudent.set(null);
        this.editForm.reset();
    }

    toggleStatus(student: Student) {
        if (student.id) {
            const updatedStudent = { ...student, active: !student.active };
            this.apiService.updateStudent(student.id, updatedStudent).subscribe({
                next: () => this.onBatchChange(),
                error: (err) => alert(`Status update failed: ${err.message || 'Check server log'}`)
            });
        }
    }

    deleteStudent(student: Student) {
        if (confirm(`Are you sure you want to permanently delete student "${student.name}"? This cannot be undone.`)) {
            if (student.id) {
                this.apiService.deleteStudent(student.id).subscribe({
                    next: () => {
                        alert(`Student "${student.name}" deleted successfully.`);
                        this.onBatchChange();
                    },
                    error: (err) => alert(`Delete failed: ${err.message || 'Check server logs'}`)
                });
            }
        }
    }

    onUpdateSubmit() {
        const student = this.editingStudent();
        if (student && student.id && this.editForm.valid) {
            this.isUpdating.set(true);
            this.apiService.updateStudent(student.id, this.editForm.value).subscribe({
                next: (res) => {
                    this.isUpdating.set(false);
                    this.closeEdit();
                    this.onBatchChange(); // Refresh list
                },
                error: (err) => {
                    this.isUpdating.set(false);
                    alert(`Update failed: ${err.message || 'Check server logs'}`);
                }
            });
        }
    }
}
