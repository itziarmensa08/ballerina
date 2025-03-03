import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { TextService } from 'src/app/services/text.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {

  message: string = '';
  whoTitle: string = '';
  whoMessage: string[] = [];

  constructor(private textService: TextService, private translate: TranslateService) {}

  ngOnInit() {
    const lang = this.translate.currentLang || 'es';

    this.textService.getText('home.message', lang).subscribe(response => {
      this.message = response.value;
    });

    this.textService.getText('who.title', lang).subscribe(response => {
      this.whoTitle = response.value;
    });

    this.textService.getText('who.message', lang).subscribe(response => {
      this.whoMessage = response.value.split('\n\n');
    });     
  }

}
