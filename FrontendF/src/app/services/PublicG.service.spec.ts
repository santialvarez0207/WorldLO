import { TestBed } from '@angular/core/testing';

import { PublicGService } from './PublicG.service';

describe('PublicGService', () => {
  let service: PublicGService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PublicGService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
