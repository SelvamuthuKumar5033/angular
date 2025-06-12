import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Ticket } from '../models/ticket.model';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Users } from '../models/users';
import { StarIcon } from 'primeng/icons';
import { DashboardWrapper } from '../models/dashboard.wrapper';

const url = 'https://172.23.55.158:8245/tickets/1.0';

@Injectable({
  providedIn: 'root',
})
export class TicketserviceService {
  constructor(private httpclient: HttpClient) {}

   private getAuthHeaders(): HttpHeaders {
    const token = sessionStorage.getItem('access_token');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
  }

  username = localStorage.getItem('username')?.toString();

  getAllTickets(): Observable<Ticket[]> {
    return this.httpclient.get<Ticket[]>(`${url}/list`,{headers: this.getAuthHeaders()});
  }

  createTicket(data: Ticket): Observable<Ticket> {
    return this.httpclient.post(`${url}/add`, data,{headers: this.getAuthHeaders()});
  }

  updateTicket(id: any, data: Ticket): Observable<Ticket> {
    return this.httpclient.put(`${url}/update/` + id, data,{headers: this.getAuthHeaders()});
  }

  getTicket(id: any): Observable<Ticket> {
    return this.httpclient.get(`${url}/get/` + id,{headers: this.getAuthHeaders()});
  }

  patchTicket(id: any, data: String): Observable<Ticket> {
    return this.httpclient.patch(`${url}/status/` + id, data,{headers: this.getAuthHeaders()});
  }

  deleteTicket(id: any): Observable<Ticket> {
    return this.httpclient.delete(`${url}/delete/` + id,{headers: this.getAuthHeaders()});
  }

  getuserTickets(username: string): Observable<Ticket[]> {
    const params = new HttpParams().set('username', username);
    return this.httpclient.get<Ticket[]>(`${url}/get`, { headers: this.getAuthHeaders(), params });
  }

  getDashboard(data: Ticket): Observable<DashboardWrapper[]> {
    return this.httpclient.post<DashboardWrapper[]>(`${url}/dashboard`, data,{headers: this.getAuthHeaders()});
  }
}
