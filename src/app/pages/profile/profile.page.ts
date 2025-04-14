import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: false
})
export class ProfilePage implements OnInit {

  user: User | null = null;
  notifications = true;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user') || sessionStorage.getItem('user') || '{}');
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

}
