import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService, User } from 'src/app/services/auth.service';
import { ImagesService } from 'src/app/services/images.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: false
})
export class RegisterPage implements OnInit {
  registerForm: FormGroup;

  imageHeader: String = '';

  constructor(
    private fb: FormBuilder, 
    private router: Router,
    private authService: AuthService,
    private alertService: AlertService,
    private imageService: ImagesService
  ) {
    this.registerForm = this.fb.group(
      {
        name: ['', Validators.required],
        surname: [''],
        username: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
      },
      { validators: this.passwordMatchValidator }
    );
  }

  ngOnInit(): void {
    this.imageService.getImageByKey('login.register').subscribe(response => {
      this.imageHeader = response;
    }); 
  }

  passwordMatchValidator(formGroup: AbstractControl): ValidationErrors | null {
    const password = formGroup.get('password');
    const confirmPassword = formGroup.get('confirmPassword');

    if (!password || !confirmPassword) return null;

    if (password.value !== confirmPassword.value) {
      confirmPassword.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    } else {
      confirmPassword.setErrors(null);
      return null;
    }
  }

  register() {
    if (this.registerForm.valid) {
      const userData: Partial<User> = { ...this.registerForm.value };

      this.authService.register(userData).subscribe({
        next: (response) => {
          this.alertService.showAlert('success', 'register.done', 'register.doneMessage');
          this.router.navigate(['/login']);
        },
        error: (err) => {
          if (err.status === 409) {
            this.alertService.showAlert('error', 'register.usernameIncorrect', 'register.usernameIncorrectMessage');
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