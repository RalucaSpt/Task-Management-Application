import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private notificationMessage: string;
  private connection: signalR.HubConnection;
  public notificationSubject: BehaviorSubject<string>;

  constructor(){
    this.notificationMessage = '';
    this.notificationSubject = new BehaviorSubject<string>(this.notificationMessage);
  }

  getNotificationMessage(): string {
    return this.notificationMessage;
  }

  initWebSocket() {
    this.connection = new signalR.HubConnectionBuilder()
      .configureLogging(signalR.LogLevel.Information)
      .withUrl('http://localhost:5140/hub/notifications')
      .build(); //use the right port here

    this.connection.on('message_received', (body: any) => {
      //This code will be executed upon receiving a message with the name 'message_received' from the server.
      console.log(body);
      this.notificationMessage = body;
      this.notificationSubject.next(this.notificationMessage);
    });

    this.connection.start().then(() => {
      // Here we can configure what to do upon starting the connection
    });
  }

  sendMessage(methodName: string, parameters?: any[]){
    this.connection.send(methodName, parameters);
  }
}
