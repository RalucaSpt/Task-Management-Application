import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '../task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private baseUrl = 'http://localhost:5140/tasks';
  constructor(private httpClient: HttpClient) {}

  readonly httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
    })
  };

  getTasks(): Observable<Task[]> {
    return this.httpClient.get<Task[]>(this.baseUrl);
  }

  addTask(newTask: Task): Observable<Task> {
    return this.httpClient.post<Task>(this.baseUrl, newTask, this.httpOptions);
  }

  deleteTask(task: Task): Observable<void> {
    return this.httpClient.delete<void>(`${this.baseUrl}/${task.id}`, this.httpOptions);
  }


  updateTask(task: Task): Observable<Task> {
    return this.httpClient.put<Task>(`${this.baseUrl}/${task.id}`, task, this.httpOptions);
  }
}
