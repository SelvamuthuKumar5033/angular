import { Component } from '@angular/core';
import { Ticket } from '../../models/ticket.model';
import { ActivatedRoute, Router } from '@angular/router';
import { TicketserviceService } from '../../service/ticketservice.service';
import { NgForm } from '@angular/forms';
import { LoaderService } from '../../service/loader.service';

@Component({
  selector: 'app-detailsticket',
  templateUrl: './detailsticket.component.html',
  styleUrl: './detailsticket.component.css',
})
export class DetailsticketComponent {
  showConfirm = false;
  ticketsid?: number;
  status?: string;
  tickets: Ticket[] = [];
  tic: Ticket = {
    // Changed to use Ticket model
    ticketerid: '',
    ticketername: '',
    ticketdesc: '',
    ticketdate: '',
    tickettime: '',
  };

  username = localStorage.getItem('username');

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private ticketserviceservice: TicketserviceService,
    private loaderService: LoaderService
  ) {}

  ngOnInit(): void {
    const obj = this;
    obj.route.params.subscribe((params) => {
      obj.tic.sid = +params['id']; // Retrieve the ID from the route
      obj.fetchTicketDetails(obj.tic.sid);
    });
  }

  fetchTicketDetails(id: any): void {
    const obj = this;
    obj.ticketserviceservice.getTicket(id).subscribe(
      (data: Ticket) => {
        obj.tic = data; // Set the fetched data to tic
      },
      (error) => {
        console.error('Error fetching ticket details:', error);
      }
    );
  }

  goBack(): void {
    const obj = this;
    obj.router.navigate(['/list-tickets']); // Adjust the path to your tickets list route
  }

  navigateToEdit(id: number): void {
    const obj = this;
    obj.router.navigate(['/add-ticket', id]); // Navigate to the detail route with the ID
  }

  //app-popup confirmation by showconfirm
  confirm(tic: Ticket) {
    const obj = this;
    obj.status='Completed';
    obj.showConfirm = true;
    obj.ticketsid=tic.sid;
  }

  //event handling for update method
  onconfirmupdate(confirmed:boolean){
    const obj = this;
    if(confirmed){
      obj.statusupdate(obj.ticketsid,obj.status);
    }
    obj.showConfirm=false;
  }


  statusupdate(id: any, status: any): void {
    const obj = this;
    obj.loaderService.show();
    // console.log("statusupdate");
    obj.ticketserviceservice.patchTicket(id, status).subscribe({
      next: () => {
        console.log('Status Update Successfully.');
      },
    });
    obj.router.navigate(['/list-tickets']);
    obj.getall();
    obj.loaderService.hide();
  }

  getall(): void {
    const obj = this;
    obj.ticketserviceservice.getAllTickets().subscribe({
      next: (data: Ticket[]) => {
        obj.tickets = data;
      },
      error: (e) => console.error(e),
    });
  }
}
