import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task } from '../task';
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDividerModule } from '@angular/material/divider';
import { TaskService } from '../services/task.service';
import { EditTaskComponent } from '../edit-task/edit-task.component';
import { Status } from '../Status';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-task-card',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatTooltipModule,
    MatProgressBarModule,
    MatDividerModule,
    MatSelectModule,
    MatFormFieldModule,
    FormsModule, ReactiveFormsModule
  ],
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.scss'] 
})
export class TaskCardComponent {
  @Input() task: Task;

  statusList = Object.values(Status);
 
  constructor(private taskService: TaskService, private dialog: MatDialog) { }

  deleteTask(task: Task): void {
    this.taskService.deleteTask(task).subscribe({
      next: () => console.log('Task deleted successfully'),
      error: (error) => console.error('Failed to delete task:', error)
    });
  }

  editTask(task: Task): void {
    const dialogRef = this.dialog.open(EditTaskComponent, { data: task });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.taskService.updateTask(result).subscribe({
          next: (updatedTask) => console.log('Task updated successfully', updatedTask),
          error: (error) => console.error('Failed to update task:', error)
        });
      }
    });
  }

  changeStatus(task: Task): void {
    this.taskService.updateTask(task).subscribe({
      next: (updatedTask) => console.log('Task status updated successfully', updatedTask),
      error: (error) => console.error('Failed to update task status:', error)
    });
  }
}