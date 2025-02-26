import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';

@Component({
  standalone: false,
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {

  constructor(
    private router: Router, 
    private menuCtrl: MenuController
  ) { }

  navigate(page: string) {
    this.router.navigate([page]);
  }

  isActive(route: string): boolean {
    return this.router.url === route;
  }

  openMenu() {
    this.menuCtrl.open();
  }

}
