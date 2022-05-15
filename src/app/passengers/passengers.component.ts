import { Passenger } from './../models/passengers.model';
import { PassengerService } from './../services/passenger.service';
import { SocketService } from './../services/socket.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-passengers',
  templateUrl: './passengers.component.html',
  styleUrls: ['./passengers.component.scss']
})
export class PassengersComponent implements OnInit {
  @ViewChild('dataContainer')
  dataContainer!: ElementRef;

  list: Observable<any> = new Observable<any>();

  rows:Passenger[]=[];

  constructor(private passengerService: PassengerService, private socketService: SocketService) {
  }

  ngOnInit(): void {
    this.checkStatus();
    this.list = this.passengerService.passengersList;
  }

  checkStatus(): void {
    this.socketService.on('connect', () => {
      console.log('Conectó');
      this.socketService.emit('connection');
      this.list.subscribe((response) => {
        let temporalRow = this.rows;
        let state:boolean=false;
         response.numbersOfUsers>=20? state=true:state=false;
        temporalRow.unshift(
          {
            ruta:response.name,
            fecha:response.time,
            cantidadPersonas:response.numbersOfUsers,
            estado:state,
          }
          )
          this.rows= [...temporalRow];
        console.log(response);
        // this.dataContainer.nativeElement.innerHTML += `
        // <tr>
        // <td>${response.name}</td>
        // <td>${response.time}</td>
        // <td>${response.numbersOfUsers}</td>
        // </tr>`
        return response;
      })
    });
    this.socketService.on('disconnect', () => {
      console.log('Desconectó');
    });
  }
}
