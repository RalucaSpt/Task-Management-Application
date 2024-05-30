import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../services/task.service';
import { Status } from '../Status';
import { Task } from '../task';
import { v4 as uuidv4 } from 'uuid';
import { NotificationService } from '../services/notification.service'; 
import { BehaviorSubject } from 'rxjs';
import { Location } from '@angular/common'; 

@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [FormsModule],
  providers: [TaskService],
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent {
  tasktitle: string = '';
  taskDescription: string = '';
  takeAssignition: string = '';
  notificationSubject: BehaviorSubject<string>;

  constructor(
    private taskService: TaskService,
    private router: Router,
    private notificationService: NotificationService,
    private location: Location 
  ) {
    this.notificationSubject = this.notificationService.notificationSubject;
  }

  onSubmit() {
    const newTask: Task = {
      id: uuidv4(),
      title: this.tasktitle,
      description: this.taskDescription,
      assignedTo: "me",
      status: Status.ToDo
    };

    this.taskService.addTask(newTask)
      .subscribe(task => {
        this.notificationService.sendMessage("BroadcastMessage", [task]);
        this.resetForm();
        this.location.back(); 
      });
  }

  resetForm() {
    this.tasktitle = '';
    this.taskDescription = '';
    this.takeAssignition = '';
  }

  onCancel() {
    this.location.back(); 
  }
}
