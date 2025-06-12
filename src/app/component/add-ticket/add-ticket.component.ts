import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TicketserviceService } from '../../service/ticketservice.service';
import { Ticket } from '../../models/ticket.model';
import { ActivatedRoute, Router } from '@angular/router';
import { LoaderService } from '../../service/loader.service';

@Component({
  selector: 'app-add-ticket',
  templateUrl: './add-ticket.component.html',
  styleUrl: './add-ticket.component.css',
})
export class AddTicketComponent {
  username = localStorage.getItem('username')?.toString();
  today: Date = new Date();
  showConfirm = false;
  alert$: boolean = false;
  message: string = '';
  tickets: Ticket[] = [];
  tic: Ticket = {
    // Changed to use Ticket model
    sid: 0,
    ticketerid: '',
    ticketername: this.username,
    ticketdesc: '',
    ticketdate: '',
    tickettime: '',
    status: 'Pending',
  };

  constructor(
    private ticketserviceservice: TicketserviceService,
    private route: ActivatedRoute,
    private router: Router,
    private loaderservice: LoaderService
  ) {
    const obj = this;
    // const today = new Date();
    obj.tic.ticketdate = obj.today.toISOString().split('T')[0];
  }

  ngOnInit(): void {
    const obj = this;
    obj.route.params.subscribe((params) => {
      if (params['id']) {
        obj.tic.sid = +params['id'];
        obj.fetchTicketDetails(obj.tic.sid);
      }
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

  addTicket(form: NgForm): void {
    const obj = this;
    // alert("addticket called");
    obj.loaderservice.show();
    if (form.valid) {
      //alert("form is valid");
      if (obj.tic.sid) {
        obj.ticketserviceservice.updateTicket(obj.tic.sid, obj.tic).subscribe({
          next: () => {
            obj.tic = {
              sid: obj.tic.sid,
              ticketerid: obj.tic.ticketerid,
              ticketername: obj.tic.ticketername,
              ticketdesc: obj.tic.ticketdesc,
              ticketdate: obj.tic.ticketdate,
            };
            form.reset();
            obj.message = 'Ticket Updated successfully !!';
            obj.alert$ = true;
            setTimeout(() => {
              obj.getall();
              this.router.navigate(['/home']);
            }, 500);
          },
          error: (e) => {
            console.error(e);
          },
        });
        obj.loaderservice.hide();
      } else {
        obj.loaderservice.show();
        obj.ticketserviceservice.createTicket(obj.tic).subscribe({
          next: () => {
            obj.tic = {
              sid: 0,
              ticketerid: '',
              ticketername: '',
              ticketdesc: '',
              ticketdate: '',
              tickettime: '',
            };
            form.reset();
            obj.message = 'Ticket Created Successfully !!';
            obj.alert$ = true;
            setTimeout(() => {
              obj.getall();
              this.router.navigate(['/home']);
            }, 500);
          },
          error: (e) => console.error(e),
        });
        obj.loaderservice.hide();
      }
    }
    obj.loaderservice.hide();
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

  //app-pop-up confirmation for goback
  confirm() {
    const obj = this;
    obj.message = 'Are you sure to goback at this stage ?';
    obj.showConfirm = true;
  }

  //event handling for goback conirmation
  onconfirmback(confirmed: boolean) {
    const obj = this;
    if (confirmed) {
      obj.gobackcancel();
    }
    obj.showConfirm = false;
  }

  gobackcancel(): void {
    const obj = this;
    obj.loaderservice.show();
    obj.router.navigate(['home']);
    obj.loaderservice.hide();
  }
}
