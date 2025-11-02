import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditGimnastPage } from './edit-gimnast.page';

describe('EditGimnastPage', () => {
  let component: EditGimnastPage;
  let fixture: ComponentFixture<EditGimnastPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EditGimnastPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
