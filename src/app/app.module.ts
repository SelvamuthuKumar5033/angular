import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { DetailsticketComponent } from './component/detailsticket/detailsticket.component';
import { HttpClient, HttpClientModule, provideHttpClient } from '@angular/common/http';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { AddTicketComponent } from './component/add-ticket/add-ticket.component';
import { TicketserviceService } from './service/ticketservice.service';
import { ListTicketsComponent } from './component/list-tickets/list-tickets.component';

@NgModule({
  declarations: [
    AppComponent,
    DetailsticketComponent,
    AddTicketComponent,
    ListTicketsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [
    provideHttpClient(),
    TicketserviceService
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
