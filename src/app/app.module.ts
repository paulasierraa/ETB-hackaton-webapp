import { SocketService } from './services/socket.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { PassengersComponent } from './passengers/passengers.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';
//* * url: endPoint * */



@NgModule({
  declarations: [
    AppComponent,
    PassengersComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    AppRoutingModule,
    SocketIoModule
  ],
  providers: [

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
