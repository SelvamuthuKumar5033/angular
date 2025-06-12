import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Users } from '../models/users';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

const url = 'https://172.23.55.158:8245/auth/1.0';

@Injectable({
  providedIn: 'root',
})
export class Usersservice {
  constructor(private httpclient: HttpClient, private router: Router) {}

  private getAuthHeaders(): HttpHeaders {
    const token = sessionStorage.getItem('access_token');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
  }

  authentication(data: Users): Observable<Users> {
    return this.httpclient.post<Users>(`${url}/login`, data, { headers: this.getAuthHeaders() });
  }

  createUser(data: Users): Observable<Users> {
    return this.httpclient.post(`${url}/register`, data, { headers: this.getAuthHeaders() });
  }

  verifyEmail(email: string): Observable<boolean> {
    const params = new HttpParams().set('email', email);
    return this.httpclient.get<boolean>(`${url}/verifyemail`, {
      params,
      headers: this.getAuthHeaders(),
    });
  }

  resetpassword(data: any): Observable<string> {
    const body = {
      email: data.email,
      newpass: data.newpassword,
    };
    return this.httpclient.patch<string>(`${url}/resetpassword`, body, {
      responseType: 'text' as 'json',
      headers: this.getAuthHeaders(),
    });
  }

  logout(): Observable<any> {
    return this.httpclient.post(`${url}/logout`, {}, { headers: this.getAuthHeaders() });
  }
}
