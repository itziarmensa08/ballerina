import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/auth.service';
import { ImagesService } from 'src/app/services/images.service';
import { User } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: false
})
export class RegisterPage implements OnInit {

  isMobile: boolean = window.innerWidth <= 768;
  resizeListener = () => this.checkScreenSize();

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
        password: ['', [
          Validators.required,
          Validators.minLength(6),
          Validators.pattern(/^(?=.*[A-Z])(?=.*\d).{6,}$/)
        ]],
        confirmPassword: ['', Validators.required],
        language: [localStorage.getItem('lang')],
        roles: ['user']
      },
      { validators: this.passwordMatchValidator }
    );
  }

  ngOnInit(): void {

    this.checkScreenSize();

    this.imageService.getImageByKey('login.register').subscribe(response => {
      this.imageHeader = response;
    });

    window.addEventListener('resize', this.resizeListener);
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

  checkScreenSize(): void {
    const wasMobile = this.isMobile;
    this.isMobile = window.innerWidth <= 768;
  }

  ngOnDestroy(): void {
    window.removeEventListener('resize', this.resizeListener);
  }
}