import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-language-selector',
  templateUrl: './language-selector.component.html',
  styleUrls: ['./language-selector.component.scss'],
  standalone: false
})
export class LanguageSelectorComponent {

  selectedLang = 'en';

  languages = [
    { code: 'ca', name: 'Català' },
    { code: 'es', name: 'Español' },
    { code: 'en', name: 'English' }
  ];

  constructor(
    private translate: TranslateService,
    private userService: UserService
  ) {
    const savedLang = localStorage.getItem('lang');
    if (savedLang) {
      this.selectedLang = savedLang;
      this.translate.use(savedLang);
    }
  }

  changeLanguage(lang: string) {
    this.translate.use(lang);
    localStorage.setItem('lang', lang);
    const user = JSON.parse(localStorage.getItem('user') || sessionStorage.getItem('user') || '{}');
    if (user._id) {
      this.userService.changeLangUser(user._id, lang).subscribe(response => {
        console.log(response);
      });
    }
  }

}
