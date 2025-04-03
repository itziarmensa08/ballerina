import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertConfirmService } from 'src/app/services/alert-confirm.service';
import { AlertService } from 'src/app/services/alert.service';
import { ContactService } from 'src/app/services/contact.service';
import { ImagesService } from 'src/app/services/images.service';

@Component({
  selector: 'app-try-it',
  templateUrl: './try-it.page.html',
  styleUrls: ['./try-it.page.scss'],
  standalone: false
})
export class TryItPage implements OnInit {

  imageHeader: String = '';
  name: string = '';
  surnames: string = '';
  message: string = '';

  constructor(
    private imageService: ImagesService,
    private alertConfirmService: AlertConfirmService
  ) { }

  ngOnInit() {
    this.imageService.getImageByKey('contact.header').subscribe(response => {
      this.imageHeader = response;
    }); 
  }

  async sendMessage () {
    const confirmed = await this.alertConfirmService.showAlert('success', 'try-it.sent', 'try-it.sent_message');
  }

}
