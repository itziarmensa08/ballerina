import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/auth.service';
import { ImagesService } from 'src/app/services/images.service';
import { ParentInfo, User, UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: false
})
export class ProfilePage implements OnInit {

  user: User | null = null;
  notifications = true;
  imageHeader: String = '';
  parents: ParentInfo[] = [
    {
      name: '',
      surname: '',
      telephone: ''
    },
    {
      name: '',
      surname: '',
      telephone: ''
    }
  ];

  constructor(
    private authService: AuthService,
    private imageService: ImagesService,
    private userService: UserService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user') || sessionStorage.getItem('user') || '{}');
    this.imageService.getImageByKey('profile.header').subscribe(response => {
      this.imageHeader = response;
    });
    if (this.user?.parents) {
      if (this.user.parents.length > 0) {
        this.parents[0] = this.user?.parents[0];
      }
      if (this.user.parents.length > 1) {
        this.parents[1] = this.user?.parents[1];
      }
    }

  }

  logout() {
    this.authService.logout();
  }

  delete_account() {}

  updateNotifications() {
    localStorage.setItem('notifications', this.notifications.toString());
    // También puedes persistir con API si es necesario
  }

  openChangePasswordModal() {
    // Lógica para abrir un modal de cambio de contraseña (puedo ayudarte a crearlo)
    console.log('Abrir modal de cambio de contraseña');
  }

  updateUser() {
    if (this.user?.dateBorn) {
      const originalDate = new Date(this.user.dateBorn);

      originalDate.setHours(2, 0, 0, 0);

      this.user!.dateBorn = originalDate;
    }
    this.userService.updateUser(this.user!._id!, this.user!).subscribe({
      next: (response) => {
        this.alertService.showAlert('success', 'profile.updated', 'profile.updated_message');
        localStorage.setItem('user',  JSON.stringify(response));
      },
      error: (error) => {
        this.alertService.showAlert('error', 'alerts.error_title', 'settings.texts.error_message');
      }
    });
  }

  updateParents() {
    if (this.user?.dateBorn) {
      const originalDate = new Date(this.user.dateBorn);

      originalDate.setHours(2, 0, 0, 0);

      this.user!.dateBorn = originalDate;
    }
    this.user!.parents = this.parents;
    this.userService.updateUser(this.user!._id!, this.user!).subscribe({
      next: (response) => {
        this.alertService.showAlert('success', 'profile.updated', 'profile.updated_message');
        localStorage.setItem('user',  JSON.stringify(response));
      },
      error: (error) => {
        this.alertService.showAlert('error', 'alerts.error_title', 'settings.texts.error_message');
      }
    });
  }

}
