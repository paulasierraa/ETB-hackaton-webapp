import { SocketService } from './socket.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PassengerService {
  passengersList = this.socketService.fromEvent('sending-data')

  constructor(private socketService:SocketService) {
  }

}
