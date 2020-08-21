import { TestBed } from '@angular/core/testing';

import { ImagenesService } from './Imagenes.service';

describe('ImagenesService', () => {
  let service: ImagenesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImagenesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
