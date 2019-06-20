import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormServices } from '../../services/form';
import { first } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';
import { HttpErrorResponse } from '@angular/common/http';
import { User } from '../../models/user-model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  hide = true;

  public loginForm: FormGroup;
  public loading = false;
  public submitted = false;
  public formErrors = {
    email: '',
    password: '',
  };

  constructor(
    public form: FormBuilder,
    public authservice: AuthenticationService,
    public router: Router,
    private route: ActivatedRoute,
    public FormService: FormServices,
    public snackbar: MatSnackBar
  ) { }

  public onSubmit(email, password) {
    this.submitted = true;

    this.FormService.markFormGroupTouched(this.loginForm);

    if (this.loginForm.valid) {
      this.authservice.login(email, password)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate(['/dashboard']);
          this.snackbar.open('Successfully Loggedin', 'Close', {
            duration: 3000,
          });
        },
        error => {
          this.loading = false;
          this.snackbar.open('Username/password not mathched', 'Close', {
            duration: 3000,
          });
          });

    } else {
      this.formErrors = this.FormService.validateForm(this.loginForm, this.formErrors, false);
    }
  }

  public buildForm() {
    this.loginForm = this.form.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });

    this.loginForm.valueChanges.subscribe((data) => {
      this.formErrors = this.FormService.validateForm(this.loginForm, this.formErrors, true);
    });
  }

  ngOnInit() {
    this.buildForm();

  }

}
