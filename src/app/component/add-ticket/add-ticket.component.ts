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
    sid:0,
    ticketerid:0,
    ticketername: '',
    ticketdesc: '',
    ticketdate: '',
    tickettime: ''
  };

  constructor(private ticketserviceservice: TicketserviceService, private route: ActivatedRoute, private router: Router) { }


  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.tic.sid = +params['id']; // Retrieve the ID from the route
      this.fetchTicketDetails(this.tic.sid);
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
      if(this.tic.sid){
          this.ticketserviceservice.updateTicket(this.tic.sid, this.tic).subscribe({
              next: ()=>{
                this.getall();
                this.router.navigate(['/list-tickets'])
              }
          })
      }
      else {
        this.ticketserviceservice.createTicket(this.tic).subscribe({
        next: () => {
          this.tic = { ticketerid: 0 , ticketername: '', ticketdesc: '', ticketdate: '', tickettime: '' };
          form.reset();
          this.getall(); // Refresh the ticket list
        },
        error: (e) => console.error(e)
      });}
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
