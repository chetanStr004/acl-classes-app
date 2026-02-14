import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Batch, Student } from '../models/auth.model';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    private readonly baseUrl = environment.apiUrl;

    constructor(private http: HttpClient) { }

    // Admin Endpoints
    createBatch(batch: Batch): Observable<Batch> {
        return this.http.post<Batch>(`${this.baseUrl}/admin/batches`, batch);
    }

    registerStudent(student: Student): Observable<string> {
        return this.http.post(`${this.baseUrl}/admin/students`, student, { responseType: 'text' });
    }

    getAdminBatches(): Observable<Batch[]> {
        return this.http.get<Batch[]>(`${this.baseUrl}/admin/batches`);
    }

    getStudentsInBatch(batchId: number): Observable<Student[]> {
        return this.http.get<Student[]>(`${this.baseUrl}/admin/batches/${batchId}/students`);
    }

    updateStudent(id: number, student: Student): Observable<string> {
        return this.http.put(`${this.baseUrl}/admin/students/${id}`, student, { responseType: 'text' });
    }

    updateBatch(id: number, batch: Batch): Observable<string> {
        return this.http.put(`${this.baseUrl}/admin/batches/${id}`, batch, { responseType: 'text' });
    }

    deleteBatch(id: number): Observable<any> {
        return this.http.delete(`${this.baseUrl}/admin/batches/${id}`, { responseType: 'text' });
    }

    deleteStudent(id: number): Observable<any> {
        return this.http.delete(`${this.baseUrl}/admin/students/${id}`, { responseType: 'text' });
    }

    // Student Endpoints
    getStudentBatches(): Observable<Batch[]> {
        return this.http.get<Batch[]>(`${this.baseUrl}/student/batches`);
    }

    getMyBatch(): Observable<Batch> {
        return this.http.get<Batch>(`${this.baseUrl}/student/my-batch`);
    }
}
