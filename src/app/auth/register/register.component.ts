import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/chatt.service';
import { MatSnackBar } from '@angular/material';
import { FormServices } from '../../services/form';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  public loading = false;
  public submitted = false;

  constructor(
    public formBuilder: FormBuilder,
    public authService: AuthService,
    public router: Router,
    public snackbar: MatSnackBar,
    public FormService: FormServices

  ) { }

  ngOnInit() {

    this.registerForm = this.formBuilder.group({
      username: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(16),
        ],
      ],
      password: ['', [Validators.required, Validators.minLength(4)]],
      confirmPass: ['', [Validators.required, Validators.minLength(4)]],
    });
  }

  onRegisterSubmit(): void {
    this.authService.registerUser(this.registerForm.value).subscribe(data => {
      if (data.success === true) {
        this.snackbar.open('Successful', 'Close', {
          duration: 3000,
        });
        this.router.navigate(['/login1']);
      } else {
        this.snackbar.open('Unsuccessful', 'Close', {
          duration: 3000,
        });
      }
    });
  }

}
