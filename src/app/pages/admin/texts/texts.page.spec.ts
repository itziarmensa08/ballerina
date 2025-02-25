import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TextsPage } from './texts.page';

describe('TextsPage', () => {
  let component: TextsPage;
  let fixture: ComponentFixture<TextsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TextsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
