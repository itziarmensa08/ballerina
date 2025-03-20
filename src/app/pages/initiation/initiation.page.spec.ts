import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InitiationPage } from './initiation.page';

describe('InitiationPage', () => {
  let component: InitiationPage;
  let fixture: ComponentFixture<InitiationPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(InitiationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
