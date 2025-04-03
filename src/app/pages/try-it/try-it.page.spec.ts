import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TryItPage } from './try-it.page';

describe('TryItPage', () => {
  let component: TryItPage;
  let fixture: ComponentFixture<TryItPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TryItPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
