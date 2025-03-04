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
  exploreTitle: string = '';
  competiMessage: string = '';
  initMessage: string = '';
  trainMessage: string = '';
  trofeusMessage: string = '';
  eventMessage: string = '';

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
    
    this.textService.getText('explore.title', lang).subscribe(response => {
      this.exploreTitle = response.value;
    }); 

    this.textService.getText('competitions.message', lang).subscribe(response => {
      this.competiMessage = response.value;
    }); 

    this.textService.getText('initiation.message', lang).subscribe(response => {
      this.initMessage = response.value;
    }); 

    this.textService.getText('training.message', lang).subscribe(response => {
      this.trainMessage = response.value;
    }); 

    this.textService.getText('trofeus.message', lang).subscribe(response => {
      this.trofeusMessage = response.value;
    }); 

    this.textService.getText('events.message', lang).subscribe(response => {
      this.eventMessage = response.value;
    }); 
  }

}
