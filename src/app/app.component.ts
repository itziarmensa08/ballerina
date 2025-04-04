import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from './services/auth.service';

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
    private authService: AuthService
  ) {}

  isIllegalPage(): boolean {
    return this.router.url === '/login' ||
        this.router.url === '/register' ||
        this.router.url.startsWith('/validate');
  }

  ngOnInit() {
    this.isAdmin = this.authService.isAdmin();
    this.isLoggedIn = this.authService.isLoggedIn();

    const user = JSON.parse(localStorage.getItem('user') || sessionStorage.getItem('user') || '{}');
    const userLanguage = user?.language || 'ca';

    this.translate.setDefaultLang(userLanguage);
    this.translate.use(userLanguage);
  }
}
