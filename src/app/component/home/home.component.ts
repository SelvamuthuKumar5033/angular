import { Component } from '@angular/core';
import { Ticket } from '../../models/ticket.model';
import { TicketserviceService } from '../../service/ticketservice.service';
import { Router } from '@angular/router';
import { LoaderService } from '../../service/loader.service';
import { DashboardWrapper } from '../../models/dashboard.wrapper';
import { AuthService } from '../../service/auth.service';
import { Usersservice } from '../../service/usersservice';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  username = localStorage.getItem('username');

  constructor(
    private router: Router,
    private loaderService: LoaderService,
    private ticketserviceService: TicketserviceService,
    private authService: AuthService,
    private userService: Usersservice
  ) {}

  showConfirm = false;
  alert$ = false;
  message: string = '';
  selectedDate: string = new Date().toISOString().split('T')[0];

  dashboard: DashboardWrapper[] = [];
  tic: Ticket = {
    // Changed to use Ticket model
    ticketerid: '',
    ticketername: this.username?.toString(),
    ticketdesc: '',
    ticketdate: this.selectedDate,
    tickettime: '',
  };

  auth = {
    username: 'admin',
    password: 'admin',
  };

  ngOnInit() {
    const obj = this;
    const justLoggedIn = sessionStorage.getItem('justLoggedIn');
    if (justLoggedIn === 'true') {
      obj.message = 'Successfully LoggedIn.';
      obj.alert$ = true;
      sessionStorage.removeItem('justLoggedIn');
      setTimeout(() => {
        obj.alert$ = false;
      }, 2000);
    }
    obj.getdashboard();
  }

  confirm() {
    const obj = this;
    obj.showConfirm = true;
  }

  //event handling by app-pop-up confirmation to navigate
  onconfirmlogout(confirmed: boolean): void {
    const obj = this;
    if (confirmed) {
      obj.loaderService.show();
      obj.userService.logout().subscribe({
        next: () => {
          obj.router.navigate(['/auth']);
          setTimeout(() => {
            localStorage.clear();
            sessionStorage.clear();
          }, 2000);
          obj.loaderService.hide();
        },
        error: (err) => {
          console.error('Logout failed:', err);
          obj.message = 'Logout failed';
          obj.alert$ = true;
          obj.loaderService.hide();
        },
      });
      obj.loaderService.hide();
    }
    obj.showConfirm = false;
  }

  navigatetoAddticket() {
    const obj = this;
    obj.loaderService.show();
    obj.router.navigate(['add-ticket']);
    obj.loaderService.hide();
  }

  navigatetoListticket() {
    const obj = this;
    obj.loaderService.show();
    obj.router.navigate(['list-tickets']);
    obj.loaderService.hide();
  }

  handleNotification(response: boolean) {
    const obj = this;
    if (!response) {
      obj.alert$ = false;
    }
  }

  getdashboard(): void {
    const obj = this;
    obj.loaderService.show();
    obj.tokenauthenticate(obj.auth);

    if (sessionStorage.getItem('access_token') != null) {
      obj.ticketserviceService.getDashboard(obj.tic).subscribe({
        next: (data) => {
          obj.dashboard = data;
          console.log(obj.dashboard[0]);
        },
        error: (err) => {
          obj.message = 'Something went Wrong';
          obj.alert$ = true;
        },
      });
    }
    obj.loaderService.hide();
  }

  onChange(): void {
    const obj = this;
    obj.tic.ticketdate = obj.selectedDate;
    console.log(obj.tic.ticketdate);
    console.log(obj.tic);
    obj.getdashboard();
  }

  tokenauthenticate(auth: any) {
    const obj = this;
    obj.loaderService.show();

    obj.authService.authtoken(auth).subscribe({
      next: (data: any) => {
        sessionStorage.setItem('access_token', data.access_token);
        obj.loaderService.hide();
      },
      error: (err) => {
        console.log(err);
        obj.message = 'Authentication Failed';
        obj.alert$ = true;
        obj.loaderService.hide();
      },
    });
  }
}
