import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Exhibition, ExhibitionsService } from 'src/app/services/exhibitions.service';
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

  exhibitions: Exhibition[] = [];

  currentLang: string = 'ca';

  constructor(
    private imageService: ImagesService,
    private textService: TextService,
    private translate: TranslateService,
    private exhibitionsService: ExhibitionsService,
    private competitionModalService: ModalCompetitionService
  ) { }

  ngOnInit() {

    const lang = this.translate.currentLang || 'es';
    this.currentLang = lang;

    this.textService.getText('initiation.text', lang).subscribe(response => {
      this.text = response.value;
    });

    this.textService.getText('initiation.header.title', lang).subscribe(response => {
      this.titleHeader = response.value;
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

    this.textService.getText('initiation.exhibit.title', lang).subscribe(response => {
      this.exhibitionsTitle = response.value;
    });

    this.loadExhibitions();
  }

  /**
   * Cargar todos las competiciones desde la API
   */
  loadExhibitions() {
    this.exhibitionsService.getAllExhibitions().subscribe(response => {
      this.exhibitions = response;
    });
  }

  getTitle (competition: Exhibition) {
    if (this.currentLang == 'ca') {
      return competition.title.ca;
    } else if (this.currentLang == 'es') {
      return competition.title.es;
    } else {
      return competition.title.en;
    }
  }

  getDescription (competition: Exhibition) {
    if (this.currentLang == 'ca') {
      return competition.description.ca;
    } else if (this.currentLang == 'es') {
      return competition.description.es;
    } else {
      return competition.description.en;
    }
  }

  async openCompetitionModal(exhibition: Exhibition) {
    await this.competitionModalService.showAlert('exhibition', this.currentLang, undefined, exhibition);
  }

}
