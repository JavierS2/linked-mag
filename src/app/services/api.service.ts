import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  // Headers comunes
  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
    });
  }

  // ========== STUDENTS ==========
  registerStudent(studentData: any): Observable<any> {
    const payload = {
      name: studentData.name,
      email: studentData.email,
      studentCode: studentData.studentCode,
      password: studentData.password,
      academicProgram: {
        name: studentData.academicProgram.name,
        code: studentData.academicProgram.code,
      },
    };

    return this.http.post(`${this.apiUrl}/api/students`, payload, {
      headers: this.getHeaders(),
    });
  }

  getStudentByCode(studentCode: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/api/students/code/${studentCode}`, {
      headers: this.getHeaders(),
    });
  }

  // ========== COMPANIES ==========
  createCompany(companyData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/companies`, companyData, {
      headers: this.getHeaders(),
    });
  }

  // ========== OFFERS ==========
  getAllOffers(): Observable<any> {
    return this.http.get(`${this.apiUrl}/api/offers`, {
      headers: this.getHeaders(),
    });
  }

  // ========== POSTULATIONS ==========
  createPostulation(postulationData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/postulations`, postulationData, {
      headers: this.getHeaders(),
    });
  }

  // ========== CURRICULUM VITAE ==========
  uploadCV(file: File, studentId: string): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post(
      `${this.apiUrl}/api/curriculum-vitae/upload`,
      formData,
      {
        params: { studentId },
      }
    );
  }
}
