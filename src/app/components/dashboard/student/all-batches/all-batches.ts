import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../../../services/api.service';
import { Batch } from '../../../../models/auth.model';

@Component({
  selector: 'app-all-batches',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './all-batches.html',
  styleUrl: './all-batches.scss',
})
export class AllBatches implements OnInit {
  batches = signal<Batch[]>([]);
  loading = signal(true);
  error = signal<string | null>(null);

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.loadAllBatches();
  }

  loadAllBatches() {
    this.apiService.getStudentBatches().subscribe({
      next: (data) => {
        this.batches.set(data);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set('Failed to load batches list.');
        this.loading.set(false);
      }
    });
  }
}
