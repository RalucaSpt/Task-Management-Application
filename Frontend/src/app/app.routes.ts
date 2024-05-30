// app.routes.ts
import { Routes } from '@angular/router';
import { TasksViewComponent } from './tasks-view/tasks-view.component';
import { AddTaskComponent } from './add-task/add-task.component';
export const routes: Routes = [
    { path: 'add', component: AddTaskComponent },
  { path: '', component: TasksViewComponent },
];
