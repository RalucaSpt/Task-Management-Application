import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task } from '../task';
import { FilterComponent } from '../filter/filter.component';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { TaskService } from '../services/task.service';
import { EditTaskComponent } from '../edit-task/edit-task.component';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [
    CommonModule, 
    FilterComponent, 
    MatIconModule, 
    MatTooltipModule, 
    MatButtonModule,
    MatSelectModule,
    MatFormFieldModule,
    FormsModule, ReactiveFormsModule
  ],
  providers: [TaskService],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  filteredTasks: Task[] = [];
  statusList: string[] = ['To do', 'In progress', 'Done'];

  constructor(
    private taskService: TaskService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.fetchTasks();
  }

  fetchTasks(): void {
    this.taskService.getTasks().subscribe({
      next: (tasks) => {
        this.tasks = tasks;
        this.filteredTasks = tasks; // Ensure filteredTasks is initialized
      },
      error: (error) => {
        console.error('Error fetching tasks:', error);
      }
    });
  }

  handleStatusSelected(status: string): void {
    this.filteredTasks = this.tasks.filter((task) => task.status === status);
  }

  changeStatus(task: Task): void {
    this.taskService.updateTask(task).subscribe({
      next: (updatedTask) => {
        console.log('Task status updated successfully:', updatedTask);
      },
      error: (error) => {
        console.error('Failed to update task status:', error);
      }
    });
  }

  onDelete(task: Task): void {
    this.taskService.deleteTask(task).subscribe(() => {
      console.log('Task deleted successfully');
      this.tasks = this.tasks.filter(t => t.id !== task.id); // Actualizează lista principală
      this.filteredTasks = this.filteredTasks.filter(t => t.id !== task.id); // Actualizează lista filtrată
    });
  }
  onEdit(task: Task): void {
    const dialogRef = this.dialog.open(EditTaskComponent, {
      data: task
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.taskService.updateTask(result).subscribe({
          next: (updatedTask) => {
            console.log('Task updated successfully:', updatedTask);
            this.fetchTasks(); // Refresh tasks
          },
          error: (error) => {
            console.error('Failed to update task:', error);
          }
        });
      }
    });
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'In progress':
        return '#FFA500'; // Orange
      case 'Done':
        return '#008000'; // Green
      case 'To do':
        return '#FF0000'; // Red
      default:
        return '#000000'; // Black (default)
    }
  }
}
