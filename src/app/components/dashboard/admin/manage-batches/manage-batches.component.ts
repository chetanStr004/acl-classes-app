import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../../../../services/api.service';
import { Batch } from '../../../../models/auth.model';

@Component({
    selector: 'app-manage-batches',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './manage-batches.component.html',
    styleUrl: './manage-batches.component.scss'
})
export class ManageBatchesComponent implements OnInit {
    batchForm: FormGroup;
    editBatchForm: FormGroup;
    batches = signal<Batch[]>([]);
    message = signal<{ text: string, type: 'success' | 'error' } | null>(null);
    searchQuery = signal<string>('');
    editingBatch = signal<Batch | null>(null);

    filteredBatches = computed(() => {
        const query = this.searchQuery().toLowerCase();
        return this.batches().filter(b =>
            b.name.toLowerCase().includes(query) ||
            b.timing.toLowerCase().includes(query)
        );
    });

    constructor(private fb: FormBuilder, private apiService: ApiService) {
        this.batchForm = this.fb.group({
            name: ['', [Validators.required]],
            timing: ['', [Validators.required]]
        });
        this.editBatchForm = this.fb.group({
            name: ['', [Validators.required]],
            timing: ['', [Validators.required]],
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

    onBatchSubmit() {
        if (this.batchForm.valid) {
            this.apiService.createBatch(this.batchForm.value).subscribe({
                next: (batch) => {
                    this.showFeedback(`Batch "${batch.name}" created!`, 'success');
                    this.batchForm.reset();
                    this.loadBatches();
                },
                error: (err) => {
                    this.showFeedback(`Failed to create batch: Error (${err.status}) ${err.error?.message || ''}`, 'error');
                }
            });
        }
    }

    openEditModal(batch: Batch) {
        this.editingBatch.set(batch);
        this.editBatchForm.patchValue({
            name: batch.name,
            timing: batch.timing,
            active: batch.active
        });
    }

    closeEditModal() {
        this.editingBatch.set(null);
    }

    onEditSubmit() {
        const batch = this.editingBatch();
        if (batch && this.editBatchForm.valid) {
            this.apiService.updateBatch(batch.id!, this.editBatchForm.value).subscribe({
                next: () => {
                    this.showFeedback('Batch updated successfully', 'success');
                    this.closeEditModal();
                    this.loadBatches();
                },
                error: () => this.showFeedback('Failed to update batch', 'error')
            });
        }
    }

    toggleBatchStatus(batch: Batch) {
        const updatedBatch = { ...batch, active: !batch.active };
        this.apiService.updateBatch(batch.id!, updatedBatch).subscribe({
            next: () => {
                this.showFeedback(`Batch ${updatedBatch.active ? 'activated' : 'deactivated'}`, 'success');
                this.loadBatches();
            },
            error: () => this.showFeedback('Failed to update status', 'error')
        });
    }

    deleteBatch(batch: Batch) {
        if (confirm(`Are you sure you want to permanently delete batch "${batch.name}"? This cannot be undone.`)) {
            this.apiService.deleteBatch(batch.id!).subscribe({
                next: () => {
                    this.showFeedback(`Batch "${batch.name}" deleted successfully`, 'success');
                    this.loadBatches();
                },
                error: () => this.showFeedback('Failed to delete batch', 'error')
            });
        }
    }

    onSearch(event: any) {
        this.searchQuery.set(event.target.value);
    }

    private showFeedback(text: string, type: 'success' | 'error') {
        this.message.set({ text, type });
        setTimeout(() => this.message.set(null), 5000);
    }
}
