import { Component } from '@angular/core';
import { Ticket } from '../../models/ticket.model';
import { TicketserviceService } from '../../service/ticketservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-tickets',
  templateUrl: './list-tickets.component.html',
  styleUrl: './list-tickets.component.css'
})
export class ListTicketsComponent {

  tickets: Ticket[] = []; // Initialize tickets array
  tic: Ticket = { // Changed to use Ticket model
    ticketerid:0,
    ticketername: '',
    ticketdesc: '',
    ticketdate: '',
    tickettime: ''
  };

  constructor(private ticketserviceservice: TicketserviceService, private router: Router) {

  }

  ngOnInit() {
    this.getall();
  }

  getall(): void {
    this.ticketserviceservice.getAllTickets().subscribe({
      next: (data) => {
        this.tickets = data;
      },
      error: (e) => console.error(e)
    });
  }

  deleteticket(id: any): void {
    if (confirm('Are you sure you want to delete this ticket?')){
        this.ticketserviceservice.deleteTicket(id).subscribe(
        data => {
          this.getall();
        }
      )
    }
  }

  navigateToDetail(id: number): void {
    this.router.navigate(['/detailsticket', id]); // Navigate to the detail route with the ID
  }
}
