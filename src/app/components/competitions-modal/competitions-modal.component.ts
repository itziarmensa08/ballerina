import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Competition } from 'src/app/services/competitions.service';

@Component({
  selector: 'app-competitions-modal',
  templateUrl: './competitions-modal.component.html',
  styleUrls: ['./competitions-modal.component.scss'],
  standalone: false
})
export class CompetitionsModalComponent {

  @Input() competition!: Competition;
  @Input() currentLang!: string;
  @Output() close = new EventEmitter<void>();

  constructor(private modalController: ModalController) {}

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
    if (this.currentLang == 'ca') {
      return this.competition.title.ca;
    } else if (this.currentLang == 'es') {
      return this.competition.title.es;
    } else {
      return this.competition.title.en;
    }
  }

  getDescription () {
    if (this.currentLang == 'ca') {
      return this.competition.description.ca.split('\n\n');
    } else if (this.currentLang == 'es') {
      return this.competition.description.es.split('\n\n');
    } else {
      return this.competition.description.en.split('\n\n');
    }
  }

}
