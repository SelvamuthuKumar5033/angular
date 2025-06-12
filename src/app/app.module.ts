import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { DetailsticketComponent } from './component/detailsticket/detailsticket.component';
import {
  HttpClient,
  HttpClientModule,
  provideHttpClient,
} from '@angular/common/http';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { AddTicketComponent } from './component/add-ticket/add-ticket.component';
import { TicketserviceService } from './service/ticketservice.service';
import { ListTicketsComponent } from './component/list-tickets/list-tickets.component';
import { UserLoginComponent } from './component/user-login/user-login.component';
import { HomeComponent } from './component/home/home.component';
import { UserRegisterComponent } from './component/user-register/user-register.component';
import { PopUpComponent } from './component/pop-up/pop-up.component';
import { TableModule } from 'primeng/table';
import { ButtonIcon, ButtonModule } from 'primeng/button';
import { LoaderComponent } from './component/loader/loader.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { ResetPasswordComponent } from './component/reset-password/reset-password.component';
import { NotificationComponent } from './component/notification/notification.component';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  declarations: [
    AppComponent,
    DetailsticketComponent,
    AddTicketComponent,
    ListTicketsComponent,
    UserLoginComponent,
    HomeComponent,
    UserRegisterComponent,
    PopUpComponent,
    LoaderComponent,
    ResetPasswordComponent,
    NotificationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    TableModule,
    ButtonIcon,
    ButtonModule,
    MatProgressSpinnerModule,
    BrowserAnimationsModule,
    MatTooltipModule,
  ],
  providers: [
    provideHttpClient(),
    TicketserviceService,
    provideAnimationsAsync(),
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: LoaderInterceptor,
    //   multi: true,
    // },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
