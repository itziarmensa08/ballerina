import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { ContactService } from 'src/app/services/contact.service';
import { ImagesService } from 'src/app/services/images.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.page.html',
  styleUrls: ['./contact.page.scss'],
  standalone: false
})
export class ContactPage implements OnInit {

  imageHeader: String = '';
  name: string = '';
  email: string = '';
  subject: string = '';
  message: string = '';

  constructor(
    private imageService: ImagesService,
    private contactService: ContactService,
    private alertService: AlertService,
    private router: Router
  ) { }

  ngOnInit() {
    this.imageService.getImageByKey('contact.header').subscribe(response => {
      this.imageHeader = response;
    }); 
  }

  sendMessage () {
    this.contactService.sendContact(this.name, this.email, this.subject, this.message).subscribe({
      next: () => {
        this.alertService.showAlert('success', 'contact.sent', 'contact.sent_message');
        this.router.navigate(['/home']);
      },
      error: (error) => {
        this.alertService.showAlert('error', 'alerts.error_title', 'alerts.error_message');
      }
    });
  }

}
