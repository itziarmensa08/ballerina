import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-custom-fab',
  templateUrl: './custom-fab.component.html',
  styleUrls: ['./custom-fab.component.scss'],
  standalone: false
})
export class CustomFabComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

  /**
   * Abre una red social en una nueva pestaña
   */
  openSocial(platform: string) {
    let url = '';

    if (platform === 'instagram') {
      url = 'https://www.instagram.com/clubgimnasticballerina/';
    } else if (platform === 'facebook') {
      url = 'https://www.facebook.com/people/Gimn%C3%A0stic-Ballerina/pfbid02qUob2brCsE61YQR9nMu2i2QAeRqHnU24f5xhVTq4XTn91cDz7TZKj5nMzj3g8WNil/';
    } else if (platform === 'whatsapp') {
      url = 'https://wa.me/34618475382';
    }

    window.open(url, '_blank');
  }

}
