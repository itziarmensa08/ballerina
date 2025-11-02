import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdministratorsPage } from './administrators.page';

describe('AdministratorsPage', () => {
  let component: AdministratorsPage;
  let fixture: ComponentFixture<AdministratorsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministratorsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
