import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  standalone: false,
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  isAdmin: boolean = false;
  isLoggedIn: boolean = false;

  constructor(
    private router: Router, 
    private menuCtrl: MenuController,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.isAdmin = this.authService.isAdmin();
    this.isLoggedIn = this.authService.isLoggedIn();
  }

  navigate(page: string) {
    this.router.navigate([page]);
  }

  isActive(route: string): boolean {
    return this.router.url === route;
  }

  openMenu() {
    this.menuCtrl.open();
  }

  /**
   * Abre una red social en una nueva pestaña
   */
  openSocial(platform: string) {
    let url = '';

    if (platform === 'instagram') {
      url = 'https://www.instagram.com/ballerina_vng/';
    } else if (platform === 'facebook') {
      url = 'https://www.facebook.com/people/Gimn%C3%A0stic-Ballerina/pfbid02qUob2brCsE61YQR9nMu2i2QAeRqHnU24f5xhVTq4XTn91cDz7TZKj5nMzj3g8WNil/';
    }

    window.open(url, '_blank');
  }

  /**
   * Navega a la página de login
   */
  navigateToLogin() {
    this.router.navigate(['/login']);
  }

  profile() {
    this.router.navigate(['/profile']);
  }

}
