import { Component, OnInit } from '@angular/core';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { CategoriesService, Category } from 'src/app/services/categories.service';
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
  competitions: Category[] = [];
  currentLang: string = 'ca';
  langSub: Subscription | undefined;

  constructor(
    private imageService: ImagesService,
    private categoriesService: CategoriesService,
    private translateService: TranslateService,
    private competitionModalService: ModalCompetitionService
  ) { }

  ngOnInit() {
    this.currentLang = this.translateService.currentLang || 'ca';
    this.imageService.getImageByKey('competitions.header').subscribe(response => {
      this.imageHeader = response;
    }); 
    this.loadCompetitions();
    this.langSub = this.translateService.onLangChange.subscribe((event: LangChangeEvent) => {
      this.currentLang = event.lang;
    });
  }

  /**
   * Cargar todos las competiciones desde la API
   */
  loadCompetitions() {
    this.categoriesService.getCategoriesByType('competition').subscribe(response => {
      this.competitions = response;
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

  async openCompetitionModal(competition: Category) {
    await this.competitionModalService.showAlert('competition', this.currentLang, competition, undefined);
  }

}
