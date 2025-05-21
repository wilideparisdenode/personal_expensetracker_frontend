import { Component, inject, OnInit, signal } from '@angular/core';
import { task } from './todo.type';
import { TaskService } from '../../tasks.service';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';
import { NotificationService } from '../../notification.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ReactiveFormsModule, MatSnackBarModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  newTask: FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    completed: new FormControl(false),
    category: new FormControl("Work")
  });

  tasks = signal<Array<task>>([]);

  taskService = inject(TaskService);
  authService = inject(AuthService);
  router = inject(Router);
  snacbar = inject(MatSnackBar); 

  constructor(private notificationService: NotificationService) {}

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks() {
    this.taskService.getTasks().subscribe({
      next: (res: any) => {
        this.tasks.set(res);
      },
      error: (err) => {
        console.error(err);
        this.router.navigate(['/login']);
      }
    });
  }

  createTask() {
    this.notificationService.notify('New task created!');
    if (this.newTask.invalid) {
      this.snacbar.open('Please fill all required fields', 'Dismiss', {
        duration: 3000
      });
      return;
    }

    this.taskService.createTask(this.newTask.value).subscribe({
      next: () => {
        this.snacbar.open("Task was successfully created", 'Dismiss', {
          duration: 3000
        });
        this.newTask.reset();
        this.loadTasks();
      },
      error: (err) => alert('Failed to add task')
    });
  }

  deleteTask(id: string) {
    this.taskService.deleteTask(id).subscribe({
      next: () => this.loadTasks(),
      error: (err) => console.log(err.message)
    });
  }

  editTask(task: any) {
    const updatedTitle = prompt('Edit Task Title:', task.title);
    if (updatedTitle !== null) {
      const updatedTask = { ...task, title: updatedTitle };
      this.taskService.updateTask(task._id, updatedTask).subscribe({
        next: () => this.loadTasks(),
        error: (err) => console.log(err.message)
      });
    }
  }

  logout() {
    this.authService.logout();
  }
}
