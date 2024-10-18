import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TicketserviceService } from '../../service/ticketservice.service';
import { Ticket } from '../../models/ticket.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-ticket',
  templateUrl: './add-ticket.component.html',
  styleUrl: './add-ticket.component.css'
})
export class AddTicketComponent {

  
  tickets: Ticket[] = [];
  tic: Ticket = { // Changed to use Ticket model
    sid: 0,
    ticketerid: 0,
    ticketername: '',
    ticketdesc: '',
    ticketdate: '',
    tickettime: ''
  };

  constructor(private ticketserviceservice: TicketserviceService, private route: ActivatedRoute, private router: Router) {

    const today = new Date();
    this.tic.ticketdate = today.toISOString().split('T')[0];
    this.tic.tickettime = '9:00 AM';
  }


  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.tic.sid = +params['id'];
        this.fetchTicketDetails(this.tic.sid);
      }
    });
  }

  fetchTicketDetails(id: any): void {
    this.ticketserviceservice.getTicket(id).subscribe(
      (data: Ticket) => {
        this.tic = data; // Set the fetched data to tic
      },
      error => {
        console.error('Error fetching ticket details:', error);
      }
    );
  }

  addTicket(form: NgForm): void {
    // alert("addticket called");
    if (form.valid) {
      // alert("form is valid");
      if (this.tic.sid) {
        this.ticketserviceservice.updateTicket(this.tic.sid, this.tic).subscribe({
          next: () => {
            this.tic = {
              sid: this.tic.sid,
              ticketerid: this.tic.ticketerid,
              ticketername: this.tic.ticketername,
              ticketdesc: this.tic.ticketdesc,
              ticketdate: this.tic.ticketdate,
              tickettime: this.tic.tickettime
            };
            this.getall();
            this.router.navigate(['/list-tickets'])
          }
        })
      }
      else {
        this.ticketserviceservice.createTicket(this.tic).subscribe({
          next: () => {
            this.tic = { sid: 0, ticketerid: 0, ticketername: '', ticketdesc: '', ticketdate: '', tickettime: '' };
            form.reset();
            this.getall(); // Refresh the ticket list
            this.router.navigate(['/list-tickets'])
          },
          error: (e) => console.error(e)
        });
      }
    }
  }



  getall(): void {
    this.ticketserviceservice.getAllTickets().subscribe({
      next: (data) => {
        this.tickets = data;
      },
      error: (e) => console.error(e)
    });
  }
}
