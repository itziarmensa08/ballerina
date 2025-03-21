import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExhibitionsPage } from './exhibitions.page';

describe('ExhibitionsPage', () => {
  let component: ExhibitionsPage;
  let fixture: ComponentFixture<ExhibitionsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ExhibitionsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
