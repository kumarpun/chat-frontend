import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/chatt.service';
import { FormServices } from '../../services/form';
import { ChatService } from '../../services/message1.service';
import { first } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-login1',
  templateUrl: './login1.component.html',
  styleUrls: ['./login1.component.css']
})
export class Login1Component implements OnInit {
  loginForm: FormGroup;
  public loading = false;
  public submitted = false;

  constructor(
    public authService: AuthService,
    public router: Router,
    public formBuilder: FormBuilder,
    public FormService: FormServices,
    public snackbar: MatSnackBar,
    public chatService: ChatService

  ) { }

  ngOnInit() {

    this.loginForm = this.formBuilder.group({
      //controlname: ['initial value', rules]
      username: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(14),
        ],
      ],
      password: ['', [Validators.required, Validators.minLength(4)]],
    });

  }
  onLoginSubmit(): void {
    this.authService.authenticateUser(this.loginForm.value).subscribe(data => {
      if (data.success === true) {
        this.authService.storeUserData(data.token, data.user);
        this.chatService.connect(data.user.username);
        this.router.navigate(['/dashboard']);
      }
    });

}
}
