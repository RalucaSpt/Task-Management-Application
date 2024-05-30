import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { TaskGridComponent } from '../task-grid/task-grid.component';
import { Task } from '../task';
import { Status } from '../Status';
import { TaskListComponent } from '../task-list/task-list.component';
import { MatIconModule } from '@angular/material/icon';
import { Routes, RouterModule } from '@angular/router';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'app-tasks-view',
  standalone: true,
  imports: [
    CommonModule, 
    TaskGridComponent, 
    TaskListComponent, 
    MatIconModule,
    RouterModule
  ],
  templateUrl: './tasks-view.component.html',
  styleUrls: ['./tasks-view.component.scss']})
export class TasksViewComponent implements OnInit {
  
  constructor(private notificationService: NotificationService) { }
  notificationMessage: string;

  ngOnInit(): void {
    this.notificationService.notificationSubject.subscribe( hasNotifications => this.notificationMessage = hasNotifications ? "New notifications, please refresh the page" : "");
  }

  taskList: Task[] = [ { id: '1', title: 'Task 1', description: 'abcd', assignedTo:"me", status: Status.ToDo },
                      {id: '2', title: 'Task 2', description: 'abcd',assignedTo:"me", status: Status.Done},
                    {id: '3', title: 'Task 3', description: 'abcd', assignedTo:"me", status: Status.InProgress}];

  isList: boolean = true; 

}
