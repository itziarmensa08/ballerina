import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from './services/auth.service';
import { MenuController } from '@ionic/angular';
import { VisitService } from './services/visits.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {

  isAdmin: boolean = false;
  isLoggedIn: boolean = false;

  constructor(
    private translate: TranslateService,
    private router: Router,
    private authService: AuthService,
    private menuCtrl: MenuController,
    private visitService: VisitService
  ) {}

  isIllegalPage(): boolean {
    return this.router.url === '/login' ||
        this.router.url === '/register' ||
        this.router.url.startsWith('/validate') ||
        this.router.url.startsWith('/create-pass');
  }

  ngOnInit() {
    this.visitService.registerVisit().subscribe();
    
    this.isAdmin = this.authService.isAdmin();
    this.isLoggedIn = this.authService.isLoggedIn();

    const userLanguage = localStorage.getItem('lang') || 'ca';
    localStorage.setItem('lang', userLanguage);

    this.translate.setDefaultLang(userLanguage);
    this.translate.use(userLanguage);
  }

  closeMenu() {
    this.menuCtrl.close();
  }
}
