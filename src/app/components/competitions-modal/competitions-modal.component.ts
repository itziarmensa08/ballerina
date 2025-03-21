import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Competition } from 'src/app/services/competitions.service';
import { Exhibition } from 'src/app/services/exhibitions.service';

@Component({
  selector: 'app-competitions-modal',
  templateUrl: './competitions-modal.component.html',
  styleUrls: ['./competitions-modal.component.scss'],
  standalone: false
})
export class CompetitionsModalComponent {

  @Input() competition: Competition | undefined;
  @Input() exhibition: Exhibition | undefined;
  @Input() type!: String;
  @Input() currentLang!: string;
  @Output() close = new EventEmitter<void>();

  constructor() {}

  closeAlert() {
    const alertElement = document.querySelector('.alert-container');
    if (alertElement) {
      alertElement.classList.add('alert-exit');
    }

    const alertOverlay = document.querySelector('.alert-overlay');
    if (alertOverlay) {
      alertOverlay.classList.add('alert-exit');
    }

    setTimeout(() => {
      this.close.emit(); 
    }, 300);
  }

  getTitle () {
    if (this.competition) {
      if (this.currentLang == 'ca') {
        return this.competition.title.ca;
      } else if (this.currentLang == 'es') {
        return this.competition.title.es;
      } else {
        return this.competition.title.en;
      }
    }
    if (this.exhibition) {
      if (this.currentLang == 'ca') {
        return this.exhibition.title.ca;
      } else if (this.currentLang == 'es') {
        return this.exhibition.title.es;
      } else {
        return this.exhibition.title.en;
      }
    }
    return '';
  }

  getDescription () {
    if (this.competition) {
      if (this.currentLang == 'ca') {
        return this.competition.description.ca.split('\n\n');
      } else if (this.currentLang == 'es') {
        return this.competition.description.es.split('\n\n');
      } else {
        return this.competition.description.en.split('\n\n');
      }
    }
    if (this.exhibition) {
      if (this.currentLang == 'ca') {
        return this.exhibition.description.ca.split('\n\n');
      } else if (this.currentLang == 'es') {
        return this.exhibition.description.es.split('\n\n');
      } else {
        return this.exhibition.description.en.split('\n\n');
      }
    }
    return [];
  }

}
