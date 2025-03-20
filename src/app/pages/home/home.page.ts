import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ImagesService } from 'src/app/services/images.service';
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
  imageHeader: String = '';
  imageWho: String = '';
  collage1: String = '';
  collage2: String = '';
  collage3: String = '';
  collage4: String = '';
  collage5: String = '';
  imageCompetitions: String = '';
  imageInitation: String = '';
  imageTraining: String = '';
  imageTrofeus: String = '';
  imageEvents: String = '';

  constructor(
    private textService: TextService, 
    private translate: TranslateService,
    private imageService: ImagesService, 
    private router: Router
  ) {}

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

    this.imageService.getImageByKey('home.header').subscribe(response => {
      this.imageHeader = response;
    }); 

    this.imageService.getImageByKey('who').subscribe(response => {
      this.imageWho = response;
    }); 

    this.imageService.getImageByKey('home.collage.1').subscribe(response => {
      this.collage1 = response;
    }); 

    this.imageService.getImageByKey('home.collage.2').subscribe(response => {
      this.collage2 = response;
    }); 

    this.imageService.getImageByKey('home.collage.3').subscribe(response => {
      this.collage3 = response;
    }); 

    this.imageService.getImageByKey('home.collage.4').subscribe(response => {
      this.collage4 = response;
    }); 

    this.imageService.getImageByKey('home.collage.5').subscribe(response => {
      this.collage5 = response;
    }); 

    this.imageService.getImageByKey('home.competitions').subscribe(response => {
      this.imageCompetitions = response;
    });
    
    this.imageService.getImageByKey('home.initiation').subscribe(response => {
      this.imageInitation = response;
    }); 

    this.imageService.getImageByKey('home.trainings').subscribe(response => {
      this.imageTraining = response;
    }); 

    this.imageService.getImageByKey('home.trofeus').subscribe(response => {
      this.imageTrofeus = response;
    }); 

    this.imageService.getImageByKey('home.events').subscribe(response => {
      this.imageEvents = response;
    }); 
  }

  navigateToCompetition() {
    this.router.navigate(['/competitions']);
  }

}
