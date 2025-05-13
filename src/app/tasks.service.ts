import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class TaskService {
  private URL = 'http://localhost:5000/api/tasks';

  constructor(private http: HttpClient) {}

  getTasks() {
    return this.http.get(this.URL, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }});
  }

  createTask(task: any) {
    return this.http.post(this.URL, task, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }});
  }

  updateTask(id: string, task: any) {
    return this.http.put(`${this.URL}/${id}`, task, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }});
  }

  deleteTask(id: string) {
    return this.http.delete(`${this.URL}/${id}`, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }});
  }
}