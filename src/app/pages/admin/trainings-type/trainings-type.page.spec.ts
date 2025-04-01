import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TrainingsTypePage } from './trainings-type.page';

describe('TrainingsTypePage', () => {
  let component: TrainingsTypePage;
  let fixture: ComponentFixture<TrainingsTypePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingsTypePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
