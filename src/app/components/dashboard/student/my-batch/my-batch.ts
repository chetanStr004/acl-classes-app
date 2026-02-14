import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../../../services/api.service';
import { Batch } from '../../../../models/auth.model';

@Component({
  selector: 'app-my-batch',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './my-batch.html',
  styleUrl: './my-batch.scss',
})
export class MyBatch implements OnInit {
  batch = signal<Batch | null>(null);
  loading = signal(true);
  error = signal<string | null>(null);

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.loadMyBatch();
  }

  loadMyBatch() {
    this.apiService.getMyBatch().subscribe({
      next: (data) => {
        this.batch.set(data);
        this.loading.set(false);
      },
      error: (err) => {
        if (err.status !== 204) { // Only set error if it's not "No Content"
          this.error.set('Failed to load your batch details.');
        }
        this.loading.set(false);
      }
    });
  }
}
