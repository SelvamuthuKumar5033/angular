import { Component } from '@angular/core';
import { Ticket } from '../../models/ticket.model';
import { ActivatedRoute, Router } from '@angular/router';
import { TicketserviceService } from '../../service/ticketservice.service';

@Component({
  selector: 'app-detailsticket',
  templateUrl: './detailsticket.component.html',
  styleUrl: './detailsticket.component.css'
})
export class DetailsticketComponent {

  tic: Ticket = { // Changed to use Ticket model
    ticketerid:0,
    ticketername: '',
    ticketdesc: '',
    ticketdate: '',
    tickettime: ''
  };

  constructor(private route: ActivatedRoute, private router: Router, private ticketserviceservice:TicketserviceService){

  }

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

  goBack(): void {
    this.router.navigate(['/list-tickets']); // Adjust the path to your tickets list route
  }

  navigateToEdit(id: number): void {
    this.router.navigate(['/add-ticket', id]); // Navigate to the detail route with the ID
  }
}
