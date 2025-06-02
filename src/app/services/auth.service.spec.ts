// auth.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  loginStudent(studentCode: string, password: string) {
    return this.http.post(`${this.apiUrl}/students/login`, { studentCode, password });
  }

  loginCompany(NIT: number, password: string) {
    return this.http.post(`${this.apiUrl}/companies/login`, { NIT, password });
  }

  saveAuthData(token: string, user: any) {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return !!token;
  }
}
