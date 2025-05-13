import { Component, inject, OnInit, signal } from '@angular/core';
import { task } from './todo.type';
import { TaskService } from '../../tasks.service';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  standalone: true, // Ensure this is set to true if it's a standalone component
  imports: [ReactiveFormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
 newTask :FormGroup= new FormGroup({
    title:new FormControl('',[Validators.required]),
   description:new FormControl('',[Validators.required]),
   completed:new FormControl(false),
    
  });
 tasks =signal<Array<task>>([]);
  taskService=inject(TaskService);
  authService=inject(AuthService);
  router=inject(Router); // Correctly inject the Router service

  constructor() {}

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks() {
    this.taskService.getTasks().subscribe({
      next: (res: any) => {
        console.log(res)
        this.tasks.set( res);
        console.log(res)
      },
      error: (err) => {
        console.error(err);
        this.router.navigate(['/login']);
      }
    });
  }

  createTask() {
    this.taskService.createTask(this.newTask.value).subscribe({
      next: () => {
                this.loadTasks();
      },
      error: (err) => alert('Failed to add task')
    });
  }

  deleteTask(id: string) {
    this.taskService.deleteTask(id).subscribe({
      next: () => this.loadTasks(),
      error: (err) =>console.log(err.message)
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