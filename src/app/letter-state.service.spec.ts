import { TestBed } from '@angular/core/testing';

import { LetterStateService } from './letter-state.service';

describe('LetterStateService', () => {
  let service: LetterStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LetterStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
