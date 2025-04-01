import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormRegistrationPage } from './form-registration.page';

describe('FormRegistrationPage', () => {
  let component: FormRegistrationPage;
  let fixture: ComponentFixture<FormRegistrationPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(FormRegistrationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
