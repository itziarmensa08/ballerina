import { Component, OnInit } from '@angular/core';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { CategoriesService, Category } from 'src/app/services/categories.service';
import { ImagesService } from 'src/app/services/images.service';
import { ModalCompetitionService } from 'src/app/services/modal-competition.service';
import { TextService } from 'src/app/services/text.service';

@Component({
  selector: 'app-trainings',
  templateUrl: './trainings.page.html',
  styleUrls: ['./trainings.page.scss'],
  standalone: false
})
export class TrainingsPage implements OnInit {

  imageHeader: String = '';
  titleHeader: String = '';
  messageHeader: String = '';
  currentLang: string = 'ca';
  image1: String = '';
  image2: String = '';
  image3: String = '';
  image4: String = '';
  image5: String = '';
  image6: String = '';
  image7: String = '';
  image8: String = '';
  image9: String = '';
  image10: String = '';
  image11: String = '';
  image12: String = '';
  typeTrainings: String = '';

  trainingTypes: Category[] = [];

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

    this.imageService.getImageByKey('trainings.header').subscribe(response => {
      this.imageHeader = response;
    }); 

    this.imageService.getImageByKey('trainings.1').subscribe(response => {
      this.image1 = response;
    }); 

    this.imageService.getImageByKey('trainings.2').subscribe(response => {
      this.image2 = response;
    }); 

    this.imageService.getImageByKey('trainings.3').subscribe(response => {
      this.image3 = response;
    }); 

    this.imageService.getImageByKey('trainings.4').subscribe(response => {
      this.image4 = response;
    }); 

    this.imageService.getImageByKey('trainings.5').subscribe(response => {
      this.image5 = response;
    }); 

    this.imageService.getImageByKey('trainings.6').subscribe(response => {
      this.image6 = response;
    }); 

    this.imageService.getImageByKey('trainings.7').subscribe(response => {
      this.image7 = response;
    }); 

    this.imageService.getImageByKey('trainings.8').subscribe(response => {
      this.image8 = response;
    }); 

    this.imageService.getImageByKey('trainings.9').subscribe(response => {
      this.image9 = response;
    }); 

    this.imageService.getImageByKey('trainings.10').subscribe(response => {
      this.image10 = response;
    }); 

    this.imageService.getImageByKey('trainings.11').subscribe(response => {
      this.image11 = response;
    }); 

    this.imageService.getImageByKey('trainings.12').subscribe(response => {
      this.image12 = response;
    }); 

    this.loadTrainingTypes();
  }

  loadTexts(lang: string) {

    this.textService.getText('trainings.types.title', lang).subscribe(response => {
      this.typeTrainings = response.value;
    });

    this.textService.getText('trainings.header.title', lang).subscribe(response => {
      this.titleHeader = response.value;
    });

    this.textService.getText('trainings.header.message', lang).subscribe(response => {
      this.messageHeader = response.value;
    });
  }

  /**
   * Cargar todos las àreas de entrenamiento desde la API
   */
  loadTrainingTypes() {
    this.categoriesService.getCategoriesByType('training_type').subscribe(response => {
      this.trainingTypes = response;
    });
  }

  getTitle (training_type: Category) {
    if (this.currentLang == 'ca') {
      return training_type.title.ca;
    } else if (this.currentLang == 'es') {
      return training_type.title.es;
    } else {
      return training_type.title.en;
    }
  }

  getDescription (training_type: Category) {
    if (this.currentLang == 'ca') {
      return training_type.description.ca;
    } else if (this.currentLang == 'es') {
      return training_type.description.es;
    } else {
      return training_type.description.en;
    }
  }

  async openTriningTypeModal(training_type: Category) {
    await this.competitionModalService.showAlert('training_type', this.currentLang, undefined, undefined, training_type);
  }

}
