import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Ticket } from '../models/ticket.model';
import { Observable } from 'rxjs';

const url ='http://localhost:9090/tickets';

@Injectable({
  providedIn: 'root'
})
export class TicketserviceService {

  constructor(private httpclient : HttpClient) { }

  getAllTickets() : Observable<Ticket[]>{
    return this.httpclient.get<Ticket[]>(`${url}`);
  }

  createTicket(data:Ticket) : Observable<Ticket>{
    return this.httpclient.post(`${url}`,data);
  }

  updateTicket(id:any, data:Ticket) : Observable<Ticket>{
    return this.httpclient.put(`${url}/`+id,data);
  }

  getTicket(id:any) : Observable<Ticket>{
    return this.httpclient.get(`${url}/`+id);
  }

  deleteTicket(id:any) : Observable<Ticket>{
    return this.httpclient.delete(`${url}/`+id);
  }
}
