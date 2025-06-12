import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailsticketComponent } from './component/detailsticket/detailsticket.component';
import { AddTicketComponent } from './component/add-ticket/add-ticket.component';
import { ListTicketsComponent } from './component/list-tickets/list-tickets.component';
import { UserLoginComponent } from './component/user-login/user-login.component';
import { HomeComponent } from './component/home/home.component';
import { UserRegisterComponent } from './component/user-register/user-register.component';
import { ResetPasswordComponent } from './component/reset-password/reset-password.component';

const routes: Routes = [
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  { path: 'home' , component: HomeComponent},
  { path: 'detailsticket/:id', component: DetailsticketComponent },
  { path: 'list-tickets', component:ListTicketsComponent},
  { path: 'add-ticket', component: AddTicketComponent },
  { path: 'add-ticket/:id', component: AddTicketComponent },
  { path: 'auth' , component: UserLoginComponent},
  { path: 'register', component: UserRegisterComponent},
  { path: 'reset-password', component: ResetPasswordComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
