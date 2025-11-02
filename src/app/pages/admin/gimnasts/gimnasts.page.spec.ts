import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GimnastsPage } from './gimnasts.page';

describe('GimnastsPage', () => {
  let component: GimnastsPage;
  let fixture: ComponentFixture<GimnastsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(GimnastsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
