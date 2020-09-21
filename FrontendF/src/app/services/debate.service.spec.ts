import { TestBed } from '@angular/core/testing';

import { DebateService } from './debate.service';

describe('DebateService', () => {
  let service: DebateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DebateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
