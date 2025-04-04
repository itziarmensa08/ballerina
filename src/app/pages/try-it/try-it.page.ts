import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertConfirmService } from 'src/app/services/alert-confirm.service';
import { AlertService } from 'src/app/services/alert.service';
import { ImagesService } from 'src/app/services/images.service';
import { TryService } from 'src/app/services/try.service';

@Component({
  selector: 'app-try-it',
  templateUrl: './try-it.page.html',
  styleUrls: ['./try-it.page.scss'],
  standalone: false
})
export class TryItPage implements OnInit {

  imageHeader: String = '';
  name: string = '';
  email: string = '';
  doneRyth: string = '';
  age: string = '';
  message: string = '';

  constructor(
    private imageService: ImagesService,
    private alertConfirmService: AlertConfirmService,
    private tryService: TryService,
    private router: Router,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.imageService.getImageByKey('contact.header').subscribe(response => {
      this.imageHeader = response;
    }); 
  }

  sendMessage () {
    this.tryService.sendTryMessage(this.name, this.email, this.age, this.doneRyth, this.message).subscribe({
      next: async () => {
        const confirmed = await this.alertConfirmService.showAlert('success', 'try-it.sent', 'try-it.sent_message');
        if (confirmed) this.router.navigate(['/home']);
      },
      error: (error) => {
        this.alertService.showAlert('error', 'alerts.error_title', 'alerts.error_message');
      }
    });
    
  }

}
