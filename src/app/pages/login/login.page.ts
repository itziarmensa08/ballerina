import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/auth.service';
import { ImagesService } from 'src/app/services/images.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false
})
export class LoginPage implements OnInit{

  loginForm: FormGroup;
  imageHeader: String = '';

  constructor(
    private fb: FormBuilder, 
    private router: Router,
    private authService: AuthService,
    private alertService: AlertService,
    private imageService: ImagesService
  ) {
    this.loginForm = this.fb.group(
      {
        username: ['', Validators.required],
        password: ['', Validators.required],
        rememberMe: [false, Validators.required]
      }
    );
  }

  ngOnInit(): void {
    this.imageService.getImageByKey('login.register').subscribe(response => {
      this.imageHeader = response;
    }); 
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
          localStorage.setItem('lang', response.user.language);
          localStorage.setItem('rememberMe', this.loginForm.value.rememberMe);
          console.log(localStorage.getItem('rememberMe'))
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
