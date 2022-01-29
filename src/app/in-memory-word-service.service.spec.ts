import { TestBed } from '@angular/core/testing';

import { InMemoryWordServiceService } from './in-memory-word-service.service';

describe('InMemoryWordServiceService', () => {
  let service: InMemoryWordServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InMemoryWordServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
