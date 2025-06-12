import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private httpclient: HttpClient) {}

  private url = 'https://172.25.10.52:8081/token';

  authtoken(data: any): Observable<any> {
    return this.httpclient.post<any>(`${this.url}/auth`, data);
  }
}
