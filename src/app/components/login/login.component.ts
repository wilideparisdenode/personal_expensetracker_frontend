import { Component } from '@angular/core';

import { RouterLink } from '@angular/router';
import { AuthService } from '../../auth.service';



import { Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [RouterLink,ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  user:FormGroup = new FormGroup({
    username:new FormControl('',[Validators.required]),
    password:new FormControl('',[Validators.required,Validators.min(8)])
  });

  constructor(private authService: AuthService, private router: Router) {}

  onLogin() {
    this.authService.login(this.user.value).subscribe({
      next: (res) => {
        localStorage.setItem('token', res.token);
        this.router.navigate(['/dashboard']);
      },
      error: (err) => console.log(err.message)
    });
  }
}