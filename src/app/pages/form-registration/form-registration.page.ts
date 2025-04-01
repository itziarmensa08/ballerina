import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonDatetime } from '@ionic/angular';
import { ImagesService } from 'src/app/services/images.service';

@Component({
  selector: 'app-form-registration',
  templateUrl: './form-registration.page.html',
  styleUrls: ['./form-registration.page.scss'],
  standalone: false
})
export class FormRegistrationPage implements OnInit {

  currentStep = 0;
  steps = ['form_registration.gimnast_data', 'Address Details', 'Tax Details', 'Summary', 'Receipt'];

  personalForm!: FormGroup;
  addressForm!: FormGroup;

  imageHeader: String = '';

  constructor(
    private fb: FormBuilder,
    private imageService: ImagesService
  ) {}

  ngOnInit() {
    this.imageService.getImageByKey('contact.header').subscribe(response => {
      this.imageHeader = response;
    }); 

    this.personalForm = this.fb.group({
      name: ['', [Validators.required]],
      surnames: ['', Validators.required],
      dateBorn: ['', Validators.required],
      dni: ['', Validators.required],
      catSalut: ['', Validators.required],
      address: ['', Validators.required],
      illness: ['', Validators.required],
      level: ['', Validators.required],
      schedule: ['', Validators.required],
    });

    this.addressForm = this.fb.group({
      street: ['', Validators.required],
      city: ['', Validators.required],
    });
  }

  nextStep() {
    let currentForm: FormGroup;
  
    switch (this.currentStep) {
      case 0:
        currentForm = this.personalForm;
        break;
      case 1:
        currentForm = this.addressForm;
        break;
      default:
        currentForm = this.personalForm;
    }
  
    if (currentForm.valid) {
      this.currentStep++;
    } else {
      Object.values(currentForm.controls).forEach(control => {
        control.markAsTouched();
      });
    }
  }  

  prevStep() {
    if (this.currentStep > 0) {
      this.currentStep--;
    }
  }

  @ViewChild('datePicker', { static: false }) datePicker!: IonDatetime;

  openDate() {
    //this.datePicker.;
  }

}
