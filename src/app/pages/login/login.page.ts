import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService, User } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false
})
export class LoginPage{

  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder, 
    private router: Router,
    private authService: AuthService,
    private alertService: AlertService
  ) {
    this.loginForm = this.fb.group(
      {
        username: ['', Validators.required],
        password: ['', Validators.required],
        rememberMe: [false, Validators.required]
      }
    );
  }

  login() {
    if (this.loginForm.valid) {
      const credentials = {username: this.loginForm.value.username, password: this.loginForm.value.password};

      this.authService.login(credentials).subscribe({
        next: (response) => {
          if (this.loginForm.value.rememberMe) {
            localStorage.setItem('accessToken', response.accessToken);
            localStorage.setItem('refreshToken', response.refreshToken);
            localStorage.setItem('user', JSON.stringify(response.user));
          } else {
            sessionStorage.setItem('accessToken', response.accessToken);
            sessionStorage.setItem('refreshToken', response.refreshToken);
            sessionStorage.setItem('user', JSON.stringify(response.user));
          }
          this.router.navigate(['/home']);
        },
        error: (err) => {
          if (err.status === 401) {
            this.alertService.showAlert('error', 'register.incorrectPassword', 'register.incorrectPasswordMessage');
          } else if (err.status === 404)  {
            this.alertService.showAlert('error', 'register.notUser', 'register.notUserMessage');
          } else {
            this.alertService.showAlert('error', 'alerts.error_title', 'alerts.error_message');
          }
        }
      });
    } 
  }

  navigateHome() {
    this.router.navigate(['/home']);
  }

}
