import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/auth.service';
import { ImagesService } from 'src/app/services/images.service';
import { User, Schedule } from 'src/app/services/user.service';

@Component({
  selector: 'app-form-registration',
  templateUrl: './form-registration.page.html',
  styleUrls: ['./form-registration.page.scss'],
  standalone: false
})
export class FormRegistrationPage implements OnInit {

  currentStep = 0;
  steps = ['form_registration.gimnast_data', 'form_registration.first_tutor_data', 'form_registration.contact_data', 'form_registration.banc_data', 'form_registration.image_rights', 'form_registration.confirmation'];

  personalForm!: FormGroup;
  firstTutorForm!: FormGroup;
  secondTutorForm!: FormGroup;
  contactForm!: FormGroup;
  bancForm!: FormGroup;
  imageRightsForm!: FormGroup;

  imageHeader: String = '';

  horarisLabels = [
    'form_registration.schedule1',
    'form_registration.schedule2',
    'form_registration.schedule3',
    'form_registration.schedule4'
  ];

  notLevel: boolean = false;
  notSchedule: boolean = false;

  constructor(
    private fb: FormBuilder,
    private imageService: ImagesService,
    private authService: AuthService,
    private alertService: AlertService,
    private router: Router
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
      address: [''],
      illness: [''],
      level: ['', Validators.required],
      schedule: this.fb.array(
        this.horarisLabels.map(() => false)
      )
    }, { validators: this.scheduleRequiredIfEscolaBase });

    this.firstTutorForm = this.fb.group({
      name: ['', [Validators.required]],
      surnames: ['', Validators.required],
      telephone: ['', Validators.required],
    });

    this.secondTutorForm = this.fb.group({
      name: [''],
      surnames: [''],
      telephone: [''],
    });

    this.contactForm = this.fb.group({
      email: ['', [Validators.required]],
      telephone: ['', Validators.required],
    });

    this.bancForm = this.fb.group({
      iban: ['', [Validators.required]],
      name: ['', Validators.required],
    });

    this.imageRightsForm = this.fb.group({
      name: ['', [Validators.required]],
      dni: ['', Validators.required],
      authorized: [false, Validators.required],
    });
  }

  nextStep() {

    this.notLevel = false;
    this.notSchedule = false;

    let currentForm: FormGroup;

    switch (this.currentStep) {
      case 0:
        currentForm = this.personalForm;
        break;
      case 1:
        currentForm = this.firstTutorForm;
        break;
      default:
        currentForm = this.personalForm;
    }

    const levelControl = this.personalForm.get('level');
    if (!levelControl?.valid) {
      this.notLevel = true;
    }

    if (this.personalForm.errors?.['scheduleRequired'] && this.personalForm.touched) {
      this.notSchedule = true;
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

  get schedule(): FormArray {
    return this.personalForm.get('schedule') as FormArray;
  }

  scheduleRequiredIfEscolaBase: ValidatorFn = (form: AbstractControl): ValidationErrors | null => {
    const level = form.get('level')?.value;
    const schedule = form.get('schedule')?.value;

    if (level === 'base') {
      const hasOneSelected = schedule?.some((v: boolean) => v);
      return hasOneSelected ? null : { scheduleRequired: true };
    }

    return null;
  };

  registerGimnast () {

    const scheduleTemplate = [
      { selectedIndex: 0, day: 'monday', startTime: '17:30:00', endTime: '18:30:00' },
      { selectedIndex: 1, day: 'tuesday', startTime: '17:30:00', endTime: '18:30:00' },
      { selectedIndex: 2, day: 'thursday', startTime: '17:30:00', endTime: '18:30:00' },
      { selectedIndex: 3, day: 'thursday', startTime: '17:30:00', endTime: '19:30:00' },
    ] as const;

    if (
      this.personalForm.invalid ||
      this.firstTutorForm.invalid ||
      this.contactForm.invalid ||
      this.bancForm.invalid ||
      this.imageRightsForm.invalid
    ) {
      console.warn('Formulario no válido');
      return;
    }

    const scheduleForm = this.personalForm.get('schedule')?.value;

    const schedule: Schedule[] = scheduleTemplate.filter(s => scheduleForm[s.selectedIndex])
      .map(s => ({ day: s.day, startTime: s.startTime, endTime: s.endTime }));

    const user: User = {
      username: this.getUsernameFromNameAndSurname(),
      password: 'temporal',
      validated: false,
      notifications: true,
      name: this.personalForm.get('name')?.value,
      surname: this.personalForm.get('surnames')?.value,
      email: this.contactForm.get('email')?.value,
      roles: ['gimnast'],
      telephone: this.contactForm.get('telephone')?.value,
      dni: this.personalForm.get('dni')?.value,
      catSalut: this.personalForm.get('catSalut')?.value,
      dateBorn: this.personalForm.get('dateBorn')?.value,
      profileImage: '',
      address: this.personalForm.get('address')?.value,
      illness: this.personalForm.get('illness')?.value,
      level: this.personalForm.get('level')?.value,
      schedule,
      parents: [
        {
          name: this.firstTutorForm.get('name')?.value,
          surname: this.firstTutorForm.get('surnames')?.value,
          telephone: this.firstTutorForm.get('telephone')?.value,
        },
        ...(this.secondTutorForm.get('name')?.value ? [{
          name: this.secondTutorForm.get('name')?.value,
          surname: this.secondTutorForm.get('surnames')?.value,
          telephone: this.secondTutorForm.get('telephone')?.value,
        }] : [])
      ],
      imageRights: {
        authorizing_tutor: {
          name: this.imageRightsForm.get('name')?.value,
          dni: this.imageRightsForm.get('dni')?.value
        },
        authorized: this.imageRightsForm.get('authorized')?.value
      },
      language: 'ca',
      bancInfo: {
        iban: this.bancForm.get('iban')?.value,
        titularity: this.bancForm.get('name')?.value
      }
    };

    this.tryRegister(user);
  }

  private getUsernameFromNameAndSurname(): string {
    const name = (this.personalForm.get('name')?.value || '').toLowerCase().replace(/\s+/g, '');
    const surnames = (this.personalForm.get('surnames')?.value || '').toLowerCase().trim();
    const firstSurname = surnames.split(' ')[0] || '';
    return `${name}${firstSurname}`;
  }

  private tryRegister(user: User, attempt = 0): void {
    const name = (this.personalForm.get('name')?.value || '').toLowerCase().replace(/\s+/g, '');
    const surnamesRaw = (this.personalForm.get('surnames')?.value || '').toLowerCase().trim();
    const surnames = surnamesRaw.split(' ').filter((s: any) => s);
    const firstSurname = surnames[0] || '';
    const secondSurname = surnames[1] || '';

    let username: string;

    switch (attempt) {
      case 0:
        username = `${name}${firstSurname}`;
        break;
      case 1:
        username = `${name}.${firstSurname}`;
        break;
      case 2:
        username = `${name}${firstSurname}${secondSurname}`;
        break;
      default:
        username = `${name}${firstSurname}${secondSurname}${attempt}`;
        break;
    }

    user.username = this.removeAccents(username);

    this.authService.register(user).subscribe({
      next: () => {
        this.alertService.showAlert('success', 'form_registration.added_title', 'form_registration.added_message');
        this.router.navigate(['/home']);
      },
      error: (error) => {
        if (error.status === 409 && attempt < 10) {
          this.tryRegister(user, attempt + 1);
        } else {
          this.alertService.showAlert('error', 'alerts.error_title', 'alerts.error_message');
        }
      }
    });
  }

  private removeAccents(str: string): string {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }

}
