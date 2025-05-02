import { Component, OnInit } from '@angular/core';
import { AlertConfirmService } from 'src/app/services/alert-confirm.service';
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
  notifications: Boolean = true;
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

  currentPassword: string = '';
  newPassword: string = '';
  repeatPassword: string = '';
  passwords_not_match: boolean = false;

  constructor(
    private authService: AuthService,
    private imageService: ImagesService,
    private userService: UserService,
    private alertService: AlertService,
    private alertConfirmService: AlertConfirmService
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
    if (this.user) this.notifications = this.user.notifications;

  }

  logout() {
    this.authService.logout();
  }

  async confirmDelete() {
    const confirmed = await this.alertConfirmService.showAlert('error', 'general.delete', 'profile.delete');
    if (confirmed) {
      this.delete_account();
    }
  }

  delete_account() {
    this.userService.deleteUser(this.user!._id!).subscribe({
      next: () => {
        this.alertService.showAlert('success', 'profile.deleted', 'profile.deleted_message');
        setTimeout(() => {
          this.authService.logout();
        }, 2000);
      },
      error: () => {
        this.alertService.showAlert('error', 'alerts.error_title', 'alerts.error_message');
      }
    });
  }

  updateNotifications() {
    if (this.user) this.user.notifications = this.notifications;
    this.userService.updateUser(this.user!._id!, this.user!).subscribe({
      next: (response) => {
        this.alertService.showAlert('success', 'profile.updated', 'profile.updated_message');
        localStorage.setItem('user',  JSON.stringify(response));
      },
      error: (error) => {
        this.alertService.showAlert('error', 'alerts.error_title', 'alerts.error_message');
      }
    });
  }

  changePassword() {
    this.passwords_not_match = false;

    if (this.newPassword != this.repeatPassword) {
      this.passwords_not_match = true
    }

    if (this.currentPassword != '' && this.newPassword != '' && this.passwords_not_match == false) {
      this.authService.changePassword(this.user!._id!, this.currentPassword, this.newPassword).subscribe({
        next: () => {
          this.alertService.showAlert('success', 'profile.updated', 'profile.updated_message');
        },
        error: (error) => {
          if (error.status === 401) {
            this.alertService.showAlert('error', 'alerts.error_title', 'profile.error_password');
          } else {
            this.alertService.showAlert('error', 'alerts.error_title', 'alerts.error_message');
          }
        }
      });
    }
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
        this.alertService.showAlert('error', 'alerts.error_title', 'alerts.error_message');
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
        this.alertService.showAlert('error', 'alerts.error_title', 'alerts.error_message');
      }
    });
  }

}
