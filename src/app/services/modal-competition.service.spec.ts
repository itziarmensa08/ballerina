import { TestBed } from '@angular/core/testing';

import { ModalCompetitionService } from './modal-competition.service';

describe('ModalCompetitionService', () => {
  let service: ModalCompetitionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModalCompetitionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
