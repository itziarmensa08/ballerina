import { Component, OnInit } from '@angular/core';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { CategoriesService, Category } from 'src/app/services/categories.service';
import { ImagesService } from 'src/app/services/images.service';
import { ModalCompetitionService } from 'src/app/services/modal-competition.service';
import { TextService } from 'src/app/services/text.service';

@Component({
  selector: 'app-initiation',
  templateUrl: './initiation.page.html',
  styleUrls: ['./initiation.page.scss'],
  standalone: false
})
export class InitiationPage implements OnInit {

  imageHeader: String = '';
  image1: String = '';
  image2: String = '';
  text: String = '';
  titleHeader: String = '';
  image3: String = '';
  image4: String = '';
  image5: String = '';
  image6: String = '';
  image7: String = '';
  image8: String = '';
  exhibitionsTitle: String = '';

  exhibitions: Category[] = [];

  currentLang: string = 'ca';

  langSub: Subscription | undefined;

  constructor(
    private imageService: ImagesService,
    private textService: TextService,
    private translate: TranslateService,
    private categoriesService: CategoriesService,
    private competitionModalService: ModalCompetitionService
  ) { }

  ngOnInit() {
    
    this.loadTexts(this.translate.currentLang || 'es');

    this.langSub = this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.loadTexts(event.lang);
      this.currentLang = event.lang;
    });

    this.imageService.getImageByKey('initation.header').subscribe(response => {
      this.imageHeader = response;
    }); 

    this.imageService.getImageByKey('initiation.1').subscribe(response => {
      this.image1 = response;
    }); 

    this.imageService.getImageByKey('initiation.2').subscribe(response => {
      this.image2 = response;
    }); 

    this.imageService.getImageByKey('initiation.3').subscribe(response => {
      this.image3 = response;
    }); 

    this.imageService.getImageByKey('initiation.4').subscribe(response => {
      this.image4 = response;
    }); 

    this.imageService.getImageByKey('initiation.5').subscribe(response => {
      this.image5 = response;
    }); 

    this.imageService.getImageByKey('initiation.6').subscribe(response => {
      this.image6 = response;
    });
    
    this.imageService.getImageByKey('initiation.7').subscribe(response => {
      this.image7 = response;
    });

    this.imageService.getImageByKey('initiation.8').subscribe(response => {
      this.image8 = response;
    });

    this.loadExhibitions();
  }

  loadTexts(lang: string) {

    this.textService.getText('initiation.exhibit.title', lang).subscribe(response => {
      this.exhibitionsTitle = response.value;
    });

    this.textService.getText('initiation.text', lang).subscribe(response => {
      this.text = response.value;
    });

    this.textService.getText('initiation.header.title', lang).subscribe(response => {
      this.titleHeader = response.value;
    });
  }
  

  /**
   * Cargar todos las competiciones desde la API
   */
  loadExhibitions() {
    this.categoriesService.getCategoriesByType('exhibition').subscribe(response => {
      this.exhibitions = response;
    });
  }

  getTitle (competition: Category) {
    if (this.currentLang == 'ca') {
      return competition.title.ca;
    } else if (this.currentLang == 'es') {
      return competition.title.es;
    } else {
      return competition.title.en;
    }
  }

  getDescription (competition: Category) {
    if (this.currentLang == 'ca') {
      return competition.description.ca;
    } else if (this.currentLang == 'es') {
      return competition.description.es;
    } else {
      return competition.description.en;
    }
  }

  async openCompetitionModal(exhibition: Category) {
    await this.competitionModalService.showAlert('exhibition', this.currentLang, undefined, exhibition);
  }

}
