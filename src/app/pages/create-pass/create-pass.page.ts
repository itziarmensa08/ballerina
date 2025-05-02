import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/auth.service';
import { ImagesService } from 'src/app/services/images.service';
import { User } from 'src/app/services/user.service';

@Component({
  selector: 'app-create-pass',
  templateUrl: './create-pass.page.html',
  styleUrls: ['./create-pass.page.scss'],
  standalone: false
})
export class CreatePassPage implements OnInit {

  imageHeader: String = '';
  user: User | undefined;
  password: string = '';
  repeat: string = '';
  passwords_not_match: boolean = false;

  constructor(
    private imageService: ImagesService,
    private router: Router,
    private authService: AuthService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.imageService.getImageByKey('login.register').subscribe(response => {
      this.imageHeader = response;
    });

    const user = JSON.parse(localStorage.getItem('user') || sessionStorage.getItem('user') || '{}');
    this.user = user;
  }

  navigateHome() {
    this.router.navigate(['/home']);
  }

  createPass() {
    this.passwords_not_match = false;

    if (this.password != this.repeat) {
      this.passwords_not_match = true
    }

    if (this.password != '' && this.repeat != '' && this.passwords_not_match == false) {
      this.authService.changePassword(this.user!._id!, 'temporal', this.password).subscribe({
        next: () => {
          this.alertService.showAlert('success', 'create-pass.updated', 'create-pass.updated_message');
          setTimeout(() => {
            this.router.navigate(['/home']);
          }, 2000);
        },
        error: (error) => {
          this.alertService.showAlert('error', 'alerts.error_title', 'alerts.error_message');
        }
      });
    }
  }

}
