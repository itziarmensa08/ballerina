import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { CompetitionsModalComponent } from 'src/app/components/competitions-modal/competitions-modal.component';
import { Competition, CompetitionsService } from 'src/app/services/competitions.service';
import { ImagesService } from 'src/app/services/images.service';
import { ModalCompetitionService } from 'src/app/services/modal-competition.service';

@Component({
  selector: 'app-competitions',
  templateUrl: './competitions.page.html',
  styleUrls: ['./competitions.page.scss'],
  standalone: false
})
export class CompetitionsPage implements OnInit {

  imageHeader: String = '';
  competitions: Competition[] = [];
  currentLang: string = 'ca';

  constructor(
    private imageService: ImagesService,
    private competitionsService: CompetitionsService,
    private translateService: TranslateService,
    private competitionModalService: ModalCompetitionService
  ) { }

  ngOnInit() {
    this.currentLang = this.translateService.currentLang || 'ca';
    this.imageService.getImageByKey('competitions.header').subscribe(response => {
      this.imageHeader = response;
    }); 
    this.loadCompetitions();
  }

  /**
   * Cargar todos las competiciones desde la API
   */
  loadCompetitions() {
    this.competitionsService.getAllCompetitions().subscribe(response => {
      this.competitions = response;
    });
  }

  getTitle (competition: Competition) {
    if (this.currentLang == 'ca') {
      return competition.title.ca;
    } else if (this.currentLang == 'es') {
      return competition.title.es;
    } else {
      return competition.title.en;
    }
  }

  getDescription (competition: Competition) {
    if (this.currentLang == 'ca') {
      return competition.description.ca;
    } else if (this.currentLang == 'es') {
      return competition.description.es;
    } else {
      return competition.description.en;
    }
  }

  async openCompetitionModal(competition: Competition) {
    await this.competitionModalService.showAlert('competition', this.currentLang, competition, undefined);
  }

}
