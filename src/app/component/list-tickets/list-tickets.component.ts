import { Component } from '@angular/core';
import { Ticket } from '../../models/ticket.model';
import { TicketserviceService } from '../../service/ticketservice.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LoaderService } from '../../service/loader.service';

@Component({
  selector: 'app-list-tickets',
  templateUrl: './list-tickets.component.html',
  styleUrl: './list-tickets.component.css',
})
export class ListTicketsComponent {
  tickets: Ticket[] = []; // Initialize tickets array
  username: string = localStorage.getItem('username')?.toString() || '';
  showConfirm = false;
  selectedTicket: any = null;
  alert$: boolean = false;
  message: string = '';

  tic: Ticket = {
    // Changed to use Ticket model
    sid: 0,
    ticketerid: '',
    ticketername: this.username,
    ticketdesc: '',
    ticketdate: '',
    tickettime: '',
    status: '',
  };

  constructor(
    private route: ActivatedRoute,
    private ticketserviceservice: TicketserviceService,
    private router: Router,
    private loaderService: LoaderService
  ) {}

  ngOnInit(): void {
    const obj = this;
    obj.getall();
  }

  validate(): boolean {
    const obj = this;
    if (obj.username === 'admin') {
      return true;
    }
    return false;
  }

  getall(): void {
    const obj = this;
    obj.loaderService.show();
    if (obj.validate()) {
      obj.ticketserviceservice.getAllTickets().subscribe({
        next: (data: Ticket[]) => {
          obj.tickets = data;
          if (obj.tickets.length == 0) {
            obj.message = 'No Ticket Found.';
            obj.alert$ = true;
          }
        },
        error: (e) => {
          console.log(e);
        },
      });
    } else {
      obj.ticketserviceservice.getuserTickets(obj.username).subscribe({
        next: (data) => {
          obj.tickets = data;
        },
        error: (e) => {
          if ((e.status = 400)) {
            obj.message = 'No Ticket Found.';
            obj.alert$ = true;
          }
        },
      });
    }
    obj.loaderService.hide();
  }

  //app-popup confirmation by showconfirm
  confirmDelete(ticket: any) {
    // Store the entire ticket object or just the necessary
    const obj = this;
    if (
      (obj.validate() && ticket.status == 'Completed') ||
      obj.username === ticket.ticketername
    ) {
      obj.showConfirm = true;
      obj.selectedTicket = ticket;
    } else {
      if (obj.validate()) {
        obj.message = 'Please Complete the Ticket.';
      } else {
        obj.message = 'You have no rights to delete this ticket !!';
      }
      obj.alert$ = true;
    }
  }

  //event handling by the confirmation of pop-up to delete
  onConfirmResult(confirmed: boolean) {
    const obj = this;
    if (confirmed && obj.selectedTicket) {
      // Only delete if user confirmed and we have a selected ticket
      obj.deleteticket(obj.selectedTicket.sid);
    }
    // Reset the confirmation dialog
    obj.showConfirm = false;
  }

  deleteticket(id: any): void {
    const obj = this;
    obj.loaderService.show();
    obj.ticketserviceservice.deleteTicket(id).subscribe(() => {
      obj.getall();
    });
    obj.showConfirm = false;
    obj.loaderService.hide();
  }

  navigateToDetail(id: number, status: String): void {
    const obj = this;
    obj.loaderService.show();
    if (obj.username == 'admin') {
      obj.ticketserviceservice.getTicket(id).subscribe({
        next: (ticket: Ticket) => {
          console.log(ticket.status);
          if (ticket.status === 'Pending') {
            obj.ticketserviceservice.patchTicket(id, status).subscribe({
              next: () => {
                console.log('Status Update Successfully.');
                obj.getall();
              },
            });
          }
        },
      });
    }
    obj.router.navigate(['/detailsticket', id]); // Navigate to the detail route with the ID
    obj.loaderService.hide();
  }

  goback(): void {
    const obj = this;
    obj.loaderService.show();
    obj.router.navigate(['/home']);
    obj.loaderService.hide();
  }
}
