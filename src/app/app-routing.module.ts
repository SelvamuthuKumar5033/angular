import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailsticketComponent } from './component/detailsticket/detailsticket.component';
import { AddTicketComponent } from './component/add-ticket/add-ticket.component';
import { ListTicketsComponent } from './component/list-tickets/list-tickets.component';

const routes: Routes = [
  { path: 'detailsticket/:id', component: DetailsticketComponent },
  { path: 'list-tickets', component:ListTicketsComponent},
  { path: 'add-ticket', component: AddTicketComponent },
  { path: 'add-ticket/:id', component: AddTicketComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
