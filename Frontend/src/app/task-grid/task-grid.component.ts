import { Component, Input, Optional } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task } from '../task';
import { TaskCardComponent } from '../task-card/task-card.component';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-task-grid',
  standalone: true,
  imports: [TaskCardComponent, CommonModule],
  providers: [TaskService],
  templateUrl: './task-grid.component.html',
  styleUrls: ['./task-grid.component.scss']
})
export class TaskGridComponent {
  tasks: Task[] = [];
  tasksToDo: Task[] = [];
  tasksInProgress: Task[] = [];
  tasksDone: Task[] = [];

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.fetchTasks();
  }

  fetchTasks(): void {
    this.taskService.getTasks().subscribe({
      next: (tasks) => {
        this.tasks = tasks;
        this.filterTasks();
      },
      error: (error) => {
        console.error('Error fetching tasks:', error);
      }
    });
  }

  filterTasks(): void {
    this.tasksToDo = this.tasks.filter(task => task.status === 'To do');
    this.tasksInProgress = this.tasks.filter(task => task.status === 'In progress');
    this.tasksDone = this.tasks.filter(task => task.status === 'Done');
  }

  trackTask(index: number, task: Task): any {
    return task ? task.id : undefined;
  }

  onDelete(task: Task) {
    this.taskService.deleteTask(task).subscribe(() => {
      console.log('Task deleted successfully');
      this.tasks = this.tasks.filter(t => t.id !== task.id);
    });
  }

  addTask(task: Task): void {
    this.taskService.addTask(task).subscribe({
      next: (newTask) => {
        this.tasks.push(newTask);
        this.fetchTasks();
      },
      error: (error) => {
        console.error('Error adding task:', error);
      }
    });
  }

}


