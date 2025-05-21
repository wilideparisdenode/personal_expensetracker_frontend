import { Component } from '@angular/core';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators,ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar,MatSnackBarModule } from '@angular/material/snack-bar';
import { inject } from '@angular/core';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  imports:[ReactiveFormsModule,MatSnackBarModule]
})
export class RegisterComponent {
  user: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
  });

  constructor(private authService: AuthService, private router: Router) {}
  snack=inject(MatSnackBar);

  onRegister() {
    this.authService.register(this.user.value).subscribe({
      next: () => {
        this.snack.open("regitrantion was successfull",'Disable',{
          duration:9000,
          panelClass:['snack_ok']

        })
        this.router.navigate(['/login']);
      },
      error: (err) =>  this.snack.open("regitrantion was unsuccessfull",'Disable',{
        duration:9000,
        panelClass:['snack_nok']

      })
    });
  }
}