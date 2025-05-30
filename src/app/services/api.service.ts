import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { StudentProfile } from '../models/student-profile.model'; // Import the StudentProfile interface

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

  loginStudent(credentials: {
    studentCode: string;
    password: string;
  }): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/students/login`, credentials, {
      headers: this.getHeaders(),
    });
  }

  getStudentProfile(): Observable<StudentProfile> {
    return this.http.get<StudentProfile>(`${this.apiUrl}/students/me`, {
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
      params: {
        include: 'company,status', // Ensure related models are included
      },
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

  // ========== JOB APPLICATIONS ==========
  getLastAppliedOffer(studentId: string): Observable<any> {
    return this.http.get(
      `${this.apiUrl}/students/${studentId}/last-applied-offer`,
      {
        headers: this.getHeaders(),
      }
    );
  }

  getAppliedOffersCount(studentId: string): Observable<number> {
    return this.http.get<number>(
      `${this.apiUrl}/students/${studentId}/applied-offers/count`,
      {
        headers: this.getHeaders(),
      }
    );
  }

  updateOffer(offerId: string, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/api/offers/${offerId}`, data, {
      headers: this.getHeaders(),
    });
  }
}
