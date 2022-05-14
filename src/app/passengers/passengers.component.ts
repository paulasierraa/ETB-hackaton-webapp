import { PassengerService } from './../services/passenger.service';
import { SocketService } from './../services/socket.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-passengers',
  templateUrl: './passengers.component.html',
  styleUrls: ['./passengers.component.css']
})
export class PassengersComponent implements OnInit {

  list: Observable<any> = new Observable<any>();
  @ViewChild('dataContainer')
  dataContainer!: ElementRef;

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
        console.log(response);
        this.dataContainer.nativeElement.innerHTML += `
        <tr>
        <td>${response.name}</td>
        <td>${response.time}</td>
        <td>${response.numbersOfUsers}</td>
        </tr>`
        console.log(this.dataContainer.nativeElement.innerHTML);

        return response;
      })
    });
    this.socketService.on('disconnect', () => {
      console.log('Desconectó');
    });
  }
}
